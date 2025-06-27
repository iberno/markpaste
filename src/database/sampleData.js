const sampleData = [
  {
    id: 'cliente-x',
    name: 'Cliente X',
    expanded: true,
    snippets: [
      { id: 'intro', title: 'Introdução', content: '# Hello Cliente' },
      { id: 'resumo', title: 'Resumo', content: 'Resumo do projeto...' },
    ],
  },
  {
    id: 'api-doc',
    name: 'API Doc',
    expanded: false,
    snippets: [
      { id: 'auth', title: 'Autenticação', content: 'POST /auth' },
    ],
  },
]
export default sampleData;
