import { invoke } from '@tauri-apps/api/core'
import { snippetTable } from '../database/schema.js'

const DB_PATH = 'sqlite:markpaste.db'

export async function execute(query, values = []) {
  return await invoke('plugin:sql|execute', {
    db: DB_PATH,
    query,
    values,
  })
}

export async function select(query, values = []) {
  return await invoke('plugin:sql|select', {
    db: DB_PATH,
    query,
    values,
  })
}

export async function initDatabase() {
  return await execute(snippetTable)
}
