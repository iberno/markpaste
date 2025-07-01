use tauri::State;
use rusqlite::params;
use serde::Serialize;
use crate::db::DbConnection;

#[derive(Serialize)]
pub struct Snippet {
    id: i64,
    title: String,
    content: String,
    category_id: Option<i64>,
}

#[tauri::command]
pub fn create_snippet(
    state: State<DbConnection>,
    title: String,
    content: String,
    category_id: Option<i64>
) -> Result<(), String> {
    let conn = state.0.lock().map_err(|_| "Erro ao travar conexão")?;

    conn.execute(
        "INSERT INTO snippets (title, content, category_id) VALUES (?1, ?2, ?3)",
        params![title, content, category_id],
    ).map_err(|e| format!("Erro ao inserir snippet: {}", e))?;

    Ok(())
}

#[tauri::command]
pub fn get_all_snippets(state: State<DbConnection>) -> Result<Vec<Snippet>, String> {
    let conn = state.0.lock().map_err(|_| "Erro ao travar conexão")?;

    let mut stmt = conn.prepare("SELECT id, title, content, category_id FROM snippets ORDER BY id DESC")
        .map_err(|e| format!("Erro na query: {}", e))?;

    let rows = stmt.query_map([], |row| {
        Ok(Snippet {
            id: row.get(0)?,
            title: row.get(1)?,
            content: row.get(2)?,
            category_id: row.get(3)?,
        })
    }).map_err(|e| format!("Erro ao mapear: {}", e))?;

    let mut items = vec![];
    for row in rows {
        items.push(row.map_err(|e| format!("Erro em linha: {}", e))?)
    }

    Ok(items)
}

#[tauri::command]
pub fn get_snippet(state: State<DbConnection>, id: i64) -> Result<Snippet, String> {
    let conn = state.0.lock().map_err(|_| "Erro ao travar conexão")?;
    let mut stmt = conn.prepare("SELECT id, title, content, category_id FROM snippets WHERE id = ?1")
        .map_err(|e| format!("Erro ao preparar SELECT: {}", e))?;

    let snippet = stmt.query_row([id], |row| {
        Ok(Snippet {
            id: row.get(0)?,
            title: row.get(1)?,
            content: row.get(2)?,
            category_id: row.get(3)?,
        })
    }).map_err(|e| format!("Snippet não encontrado: {}", e))?;

    Ok(snippet)
}

#[tauri::command]
pub fn update_snippet(
    state: State<DbConnection>,
    id: i64,
    title: String,
    content: String,
    category_id: Option<i64>
) -> Result<(), String> {
    let conn = state.0.lock().map_err(|_| "Erro ao travar conexão")?;

    conn.execute(
        "UPDATE snippets SET title = ?1, content = ?2, category_id = ?3 WHERE id = ?4",
        params![title, content, category_id, id],
    ).map_err(|e| format!("Erro ao atualizar snippet: {}", e))?;

    Ok(())
}

#[tauri::command]
pub fn delete_snippet(state: State<DbConnection>, id: i64) -> Result<(), String> {
    let conn = state.0.lock().map_err(|_| "Erro ao travar conexão")?;

    conn.execute(
        "DELETE FROM snippets WHERE id = ?1",
        [id],
    ).map_err(|e| format!("Erro ao deletar snippet: {}", e))?;

    Ok(())
}
