'use strict';
// Camada visual: conhece Google Maps, mas não altera o localStorage.
const GeoMapa = (() => {
  let mapa = null;
  let marcadores = [];
  let AdvancedMarkerElement, PinElement;
  const cores = {
    online: ['#16a34a', '#166534'],
    offline: ['#dc2626', '#991b1b'],
    manutencao: ['#eab308', '#a16207']
  };

  function carregarAPI() {
    return new Promise((resolve, reject) => {
      const chave = CONFIG.GOOGLE_MAPS_API_KEY;
      if (!chave || chave === 'SUA_CHAVE_API') {
        reject(new Error('Configure sua chave Google Maps em js/config.js.'));
        return;
      }
      window.geolabGooglePronto = resolve;
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(chave) + '&v=weekly&loading=async&callback=geolabGooglePronto';
      script.async = true;
      script.onerror = () => reject(new Error('Falha ao carregar a API do Google Maps.'));
      document.head.append(script);
    });
  }

  async function iniciar(aoClicar) {
    await carregarAPI();
    const [bibliotecaMapa, bibliotecaMarcador] = await Promise.all([
      google.maps.importLibrary('maps'), google.maps.importLibrary('marker')
    ]);
    AdvancedMarkerElement = bibliotecaMarcador.AdvancedMarkerElement;
    PinElement = bibliotecaMarcador.PinElement;
    mapa = new bibliotecaMapa.Map(document.querySelector('#mapa'), {
      center: CONFIG.CENTRO, zoom: CONFIG.ZOOM, mapId: CONFIG.MAP_ID
    });
    mapa.addListener('click', (evento) => {
      if (evento.latLng) aoClicar(evento.latLng.lat(), evento.latLng.lng());
    });
  }

  function desenhar(dispositivos) {
    if (!mapa) return;
    // Desanexa os marcadores anteriores para não duplicar os pontos.
    marcadores.forEach(m => { m.map = null; });
    marcadores = dispositivos.map(d => {
      const [background, borderColor] = cores[d.status];
      const pin = new PinElement({ background, borderColor, glyphColor: '#ffffff' });
      return new AdvancedMarkerElement({
        map: mapa, position: { lat: d.lat, lng: d.lng },
        title: `${d.tag} (${d.tipo}) • ${d.status}`, content: pin.element
      });
    });
  }
  function localizar(d) {
    if (!mapa) return;
    mapa.setCenter({ lat: d.lat, lng: d.lng }); mapa.setZoom(16);
  }
  function mostrarTodos(dispositivos) {
    if (!mapa) return;
    if (!dispositivos.length) { mapa.setCenter(CONFIG.CENTRO); mapa.setZoom(CONFIG.ZOOM); return; }
    if (dispositivos.length === 1) { localizar(dispositivos[0]); return; }
    const bounds = new google.maps.LatLngBounds();
    dispositivos.forEach(d => bounds.extend({ lat: d.lat, lng: d.lng }));
    mapa.fitBounds(bounds, 60);
  }
  return { iniciar, desenhar, localizar, mostrarTodos };
})();
