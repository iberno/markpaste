import { useEffect, useState, useCallback } from 'react'
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} from '../services/categories.js'

export default function useCategories() {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const carregar = useCallback(async () => {
    setLoading(true)
    try {
      const dados = await getAllCategories()
      setCategorias(dados)
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const addCategory = async (name) => {
    await createCategory(name)
    await carregar()
  }

  const editCategory = async (id, name) => {
    await updateCategory(id, name)
    await carregar()
  }

  const removeCategory = async (id) => {
    await deleteCategory(id)
    await carregar()
  }

  useEffect(() => {
    carregar()
  }, [carregar])

  return {
    categorias,
    loading,
    error,
    reload: carregar,
    addCategory,
    editCategory,
    removeCategory
  }
}
