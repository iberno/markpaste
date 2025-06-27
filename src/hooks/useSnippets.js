// src/hooks/useSnippets.js
import { useEffect, useState } from 'react'
import { initDatabase } from '../api/db.js'
import { getAllSnippets } from '../api/snippets.js'
import { seedDatabase } from '../database/seed.js'

export default function useSnippets() {
  const [snippets, setSnippets] = useState([])

  // Agrupamento por categoria_id e nome da categoria
  function groupByCategory(data) {
    const groups = []
    data.forEach(item => {
      const existingGroup = groups.find(g => g.id === item.category_id)
      const snippet = {
        id: item.id,
        title: item.title,
        content: item.content,
        created_at: item.created_at,
        category_id: item.category_id,
      }
      if (existingGroup) {
        existingGroup.snippets.push(snippet)
      } else {
        groups.push({
          id: item.category_id,
          name: item.category || 'Sem categoria',
          snippets: [snippet],
        })
      }
    })
    return groups
  }

  async function loadSnippets() {
    const data = await getAllSnippets()
    setSnippets(groupByCategory(data))
  }

  useEffect(() => {
    async function setup() {
      await initDatabase()

      const current = await getAllSnippets()
      if (current.length === 0) {
        await seedDatabase()
      }
      await loadSnippets()
    }
    setup()
  }, [])

  return { snippets, reload: loadSnippets }
}

  // Recarrega os dados do banco
  async function loadSnippets() {
    const data = await getAllSnippets()
    setSnippets(groupByCategory(data))
  }

  useEffect(() => {
    async function setup() {
      await initDatabase()
      const current = await getAllSnippets()
      if (current.length === 0) {
        await seedDatabase()
      }
      await loadSnippets()
    }
    setup()
  }, [])

  return { snippets, reload: loadSnippets }
