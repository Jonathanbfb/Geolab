'use strict';
// Demonstra formulários, eventos e sessionStorage; NÃO é segurança real.
const form = document.querySelector('#loginForm');
if (sessionStorage.getItem('geolabLogado') === 'sim') location.replace('mapa.html');
form.addEventListener('submit', (evento) => {
  evento.preventDefault(); // Não envia o formulário nem recarrega a página.
  const usuario = document.querySelector('#usuario').value.trim();
  const senha = document.querySelector('#senha').value;
  if (usuario === 'aluno' && senha === '123456') {
    sessionStorage.setItem('geolabLogado', 'sim'); // Vale nesta aba/sessão.
    location.replace('mapa.html');
  } else {
    document.querySelector('#erroLogin').textContent = 'Usuário ou senha inválidos.';
  }
});
