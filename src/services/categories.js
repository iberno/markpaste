import { invoke } from '@tauri-apps/api/core'

export async function createCategory(name) {
  return await invoke('create_category', { name })
}

export async function getAllCategories() {
  return await invoke('get_all_categories')
}

export async function getCategory(id) {
  return await invoke('get_category', { id })
}

export async function updateCategory(id, name) {
  return await invoke('update_category', { id, name })
}

export const removeCategory = async (id) => {
  try {
    await deleteCategory(id)
    await carregar()
  } catch (err) {
    console.error('Erro ao remover categoria:', err)
    setError(err.message || 'Erro inesperado')
  }
}
