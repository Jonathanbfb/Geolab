OBJETIVO
Login didático, CRUD de dispositivos, marcadores por status, pesquisa,
filtro, exportação JSON e publicação estática no GitHub Pages.

EXECUÇÃO LOCAL
1) Extraia este ZIP em uma pasta.
2) Abra js/config.js e altere SUA_CHAVE_API pela chave da API.
3) Abra o terminal nessa pasta, execute: python -m http.server 8000
4) Abra http://localhost:8000/ (NÃO use file://).
5) Login: aluno / 123456.
6) Cadastre dispositivos manualmente ou clique em 'Carregar exemplos'.
7) Clique no mapa para capturar coordenadas; use editar, excluir, status,
   buscar, filtrar, mostrar todos e exportar JSON.

PUBLICAR PELO GITHUB PAGES
1) Crie um repositório PUBLICO no GitHub, por ex. geolab-dispositivos.
2) Envie todos os arquivos da pasta, mantendo index.html NA RAIZ e js/.
3) Settings > Pages > Build and deployment > Deploy from a branch.
4) Branch: main; Folder: /(root); Save.
5) Abra https://SEU_USUARIO.github.io/geolab-dispositivos/
6) Em Google Cloud, restrinja a chave HTTP referrer para:
   http://localhost:8000/*
   https://SEU_USUARIO.github.io/*
   Atenção: restrições podem demorar para propagar. Use URLs exatas do seu projeto.
7) Teste login e marcadores na URL publicada.

ESTRUTURA
index.html             entrada / login
mapa.html              painel, formulário e mapa
style.css              identidade visual e responsividade
js/config.js           configuração pública (restrinja a chave no Cloud)
js/auth.js             login didático/sessionStorage
js/storage.js          validação e persistência no localStorage
js/mapa.js             API Google Maps, pins e zoom
js/app.js              CRUD, filtros, exportação e eventos
