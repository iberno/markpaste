import { useEffect, useState, useCallback } from 'react'
import {
  createCategory,
  getAllCategories,
  updateCategory,
  removeCategory
} from '../services/categories.js'

export default function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const carregar = useCallback(async () => {
    setLoading(true)
    try {
      const dados = await getAllCategories()
      setCategories(dados)
      setError(null)
    } catch (err) {
      console.error('Erro ao carregar categorias:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const addCategory = async (name) => {
    try {
      await createCategory(name)
      await carregar()
    } catch (err) {
      console.error('Erro ao adicionar categoria:', err)
      setError(err)
    }
  }

  const editCategory = async (id, name) => {
    try {
      await updateCategory(id, name)
      await carregar()
    } catch (err) {
      console.error('Erro ao editar categoria:', err)
      setError(err)
    }
  }

  const removeCategory = async (id) => {
    try {
      await deleteCategory(id)
      await carregar()
    } catch (err) {
      console.error('Erro ao remover categoria:', err)
      setError(err)
    }
  }

  useEffect(() => {
    carregar()
  }, [carregar])

  return {
    categories,
    loading,
    error,
    reload: carregar,
    addCategory,
    editCategory,
    removeCategory
  }
}
