import { useEffect, useState, useCallback } from 'react'
import {
  createSnippet,
  updateSnippet,
  deleteSnippet,
  getAllSnippets
} from '../services/snippets.js'

export default function useSnippets() {
  const [snippets, setSnippets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const carregar = useCallback(async () => {
    setLoading(true)
    try {
      const lista = await getAllSnippets()
      setSnippets(lista)
      setError(null)
    } catch (err) {
      console.error('Erro ao carregar snippets:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const addSnippet = async (title, category_id) => {
    try {
      await createSnippet(title, category_id)
      await carregar()
    } catch (err) {
      setError(err)
    }
  }

  const editSnippet = async (id, title, content, category_id) => {
    try {
      await updateSnippet(id, title, content, category_id)
      await carregar()
    } catch (err) {
      setError(err)
    }
  }

  const removeSnippet = async (id) => {
    try {
      await deleteSnippet(id)
      await carregar()
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    carregar()
  }, [carregar])

  return {
    snippets,
    loading,
    error,
    reload: carregar,
    addSnippet,
    editSnippet,
    removeSnippet
  }
}
