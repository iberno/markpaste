import { execute, select } from './db'
/**
 * Cria um novo snippet com vínculo à categoria via ID
 */
export async function createSnippet({ title, content, category_id }) {
  await execute(
    `INSERT INTO snippets (title, content, category_id) VALUES (?1, ?2, ?3)`,
    [title, content, category_id]
  )
}
/**
 * Retorna todos os snippets com JOIN na tabela de categorias
 */
export async function getAllSnippets() {
  return await select(`
    SELECT snippets.id, snippets.title, snippets.content, snippets.created_at,
           snippets.category_id, categories.name AS category
    FROM snippets
    LEFT JOIN categories ON snippets.category_id = categories.id
    ORDER BY snippets.created_at DESC
  `)
}
/**
 * Atualiza um snippet existente, incluindo o vínculo com a categoria
 */
export async function updateSnippet(id, { title, content, category_id }) {
  await execute(
    `UPDATE snippets SET title = ?1, content = ?2, category_id = ?3 WHERE id = ?4`,
    [title, content, category_id, id]
  )
}
/**
 * Remove um snippet do banco de dados
 */
export async function deleteSnippet(id) {
  await execute(`DELETE FROM snippets WHERE id = ?1`, [id])
}
