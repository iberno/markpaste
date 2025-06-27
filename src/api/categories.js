// src/api/categories.js
import { execute, select } from './db'

export async function createCategory(name) {
  await execute(`INSERT INTO categories (name) VALUES (?1)`, [name])
}

export async function getAllCategories() {
  return await select(`SELECT * FROM categories ORDER BY name`)
}

export async function getCategoryIdByName(name) {
  const rows = await select(`SELECT id FROM categories WHERE name = ?1`, [name])
  return rows[0]?.id || null
}
