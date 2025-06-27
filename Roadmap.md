# 📍 Roadmap do MarkPaste

Este documento organiza ideias, melhorias futuras e recursos planejados para o MarkPaste. É um guia vivo, construído conforme o projeto evolui — com foco especial na experiência do usuário, estrutura escalável e produtividade.

---

## ✅ Fase atual: CRUD funcional

- [x] Banco SQLite local via Tauri Plugin
- [x] Separação de tabelas: `categories` e `snippets`
- [x] População inicial com `seedDatabase()`
- [x] Hook `useSnippets()` com agrupamento dinâmico
- [x] Sidebar alimentada com dados reais
- [x] Criação de snippets via botão “Novo”
- [x] Preparação para edição/salvamento com `updateSnippet`

---

## 🚧 Melhorias planejadas (short term)

### Sidebar e UX
- [ ] Colapsar/expandir categorias na árvore (pastinhas)
- [ ] Exibir categorias vazias
- [ ] Menu de contexto (clique direito) em categorias:
  - Nova categoria
  - Renomear
  - Excluir
- [ ] Agrupar e mover snippets via drag and drop

### Editor
- [ ] Abrir snippet ao clicar na Sidebar
- [ ] Editar título/conteúdo
- [ ] Botão “Salvar” persistindo no banco (`updateSnippet`)
- [ ] Botão “Excluir snippet”
- [ ] Campo de categoria com select ou autocomplete

---

## 💡 Ideias futuras (medium/long term)

### Organização e estilo
- [ ] Cores e ícones personalizados por categoria
- [ ] Marcar snippets como “favoritos”
- [ ] Campo de tags por snippet

### Acessibilidade e desempenho
- [ ] Busca por título/conteúdo/tag
- [ ] Filtros rápidos por categoria ou tag
- [ ] Suporte a dark/light theme

### Backup e interoperabilidade
- [ ] Exportar/importar base de snippets (.json / .md)
- [ ] Exportar base completa (`markpaste.db`) para backup
- [ ] Suporte a sincronização via Git/local storage (futuramente)

---

## ✨ Extras a considerar

- [ ] Abrir último snippet selecionado ao iniciar o app
- [ ] Painel de configurações gerais
- [ ] Animações suaves para abrir/fechar árvore
- [ ] Atalhos de teclado: `Ctrl + N`, `Ctrl + S`, etc.

---

_Toda sugestão que surgir durante a evolução do projeto pode ser adicionada aqui. Este roadmap é vivo como o próprio código!_ 🚀
