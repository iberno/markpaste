// src/database/seed.js
import { createSnippet } from '../api/snippets.js'
import { createCategory, getCategoryIdByName } from '../api/categories.js'

const sampleData = [
  {
    category: 'Cliente X',
    snippets: [
      { title: 'Introdução', content: '# Bem-vindo ao projeto Cliente X' },
      { title: 'Resumo', content: '## Resumo\nEste projeto visa...' },
    ],
  },
  {
    category: 'Documentação API',
    snippets: [
      { title: 'Autenticação', content: 'POST /auth\n\nBody: { email, senha }' },
      { title: 'Endpoints', content: '/users\n/tasks\n/projects' },
    ],
  },
]

export async function seedDatabase() {
  for (const group of sampleData) {
    await createCategory(group.category)
    const categoryId = await getCategoryIdByName(group.category)

    for (const snip of group.snippets) {
      await createSnippet({
        title: snip.title,
        content: snip.content,
        category_id: categoryId,
      })
    }
  }
}
