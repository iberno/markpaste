import { invoke } from '@tauri-apps/api/core'

export async function createSnippet(title, content, categoryId) {
  return await invoke('create_snippet', {
    title,
    content,
    categoryId
  })
}

export async function getAllSnippets() {
  return await invoke('get_all_snippets')
}

export async function getSnippet(id) {
  return await invoke('get_snippet', { id })
}

export async function updateSnippet(id, title, content, categoryId) {
  return await invoke('update_snippet', {
    id,
    title,
    content,
    categoryId
  })
}

export async function deleteSnippet(id) {
  return await invoke('delete_snippet', { id })
}
