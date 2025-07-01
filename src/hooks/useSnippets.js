import { useEffect, useState, useCallback } from 'react'
import {
  createSnippet,
  getAllSnippets,
  updateSnippet,
  deleteSnippet
} from '../services/snippets'

export default function useSnippets() {
  const [snippets, setSnippets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const carregar = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAllSnippets()
      setSnippets(data)
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const addSnippet = async ({ title, content, categoryId }) => {
    await createSnippet(title, content, categoryId)
    await carregar()
  }

  const editSnippet = async ({ id, title, content, categoryId }) => {
    await updateSnippet(id, title, content, categoryId)
    await carregar()
  }

  const removeSnippet = async (id) => {
    await deleteSnippet(id)
    await carregar()
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
