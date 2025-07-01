use tauri::State;
use rusqlite::params;
use serde::Serialize;
use crate::db::DbConnection;

#[derive(Serialize)]
pub struct Category {
    id: i64,
    name: String,
}

#[tauri::command]
pub fn create_category(state: State<DbConnection>, name: String) -> Result<(), String> {
    let conn = state.0.lock().map_err(|_| "Erro ao travar conexão")?;
    conn.execute(
        "INSERT OR IGNORE INTO categories (name) VALUES (?1)",
        params![name],
    ).map_err(|e| format!("Erro ao inserir: {}", e))?;
    Ok(())
}

#[tauri::command]
pub fn get_all_categories(state: State<DbConnection>) -> Result<Vec<Category>, String> {
    let conn = state.0.lock().map_err(|_| "Erro ao travar conexão")?;

    let mut stmt = conn.prepare("SELECT id, name FROM categories ORDER BY name ASC")
        .map_err(|e| format!("Erro na query: {}", e))?;

    let rows = stmt.query_map([], |row| {
        Ok(Category {
            id: row.get(0)?,
            name: row.get(1)?,
        })
    }).map_err(|e| format!("Erro ao mapear: {}", e))?;

    let mut items = vec![];
    for row in rows {
        items.push(row.map_err(|e| format!("Erro em linha: {}", e))?)
    }

    Ok(items)
}

#[tauri::command]
pub fn get_category(state: State<DbConnection>, id: i64) -> Result<Category, String> {
    let conn = state.0.lock().map_err(|_| "Erro ao travar conexão")?;
    let mut stmt = conn.prepare("SELECT id, name FROM categories WHERE id = ?1")
        .map_err(|e| format!("Erro na query: {}", e))?;

    let cat = stmt.query_row([id], |row| {
        Ok(Category {
            id: row.get(0)?,
            name: row.get(1)?,
        })
    }).map_err(|e| format!("Categoria não encontrada: {}", e))?;

    Ok(cat)
}

#[tauri::command]
pub fn update_category(state: State<DbConnection>, id: i64, name: String) -> Result<(), String> {
    println!("🔧 Atualizando categoria ID: {} para '{}'", id, name);

    let conn = state.0.lock().map_err(|e| {
        let msg = format!("Erro ao travar conexão: {}", e);
        eprintln!("{}", msg);
        msg
    })?;

    conn.execute(
        "UPDATE categories SET name = ?1 WHERE id = ?2",
        params![name, id],
    )
    .map_err(|e| {
        let msg = format!("Erro ao atualizar categoria: {}", e);
        eprintln!("{}", msg);
        msg
    })?;

    println!("✅ Categoria atualizada com sucesso!");
    Ok(())
}

#[tauri::command]
pub fn delete_category(state: State<DbConnection>, id: i64) -> Result<(), String> {
    let conn = state.0.lock().map_err(|_| "Erro ao travar conexão")?;

    let count: i64 = conn.query_row(
        "SELECT COUNT(*) FROM snippets WHERE category_id = ?1",
        params![id],
        |row| row.get(0),
    ).map_err(|e| format!("Erro ao verificar snippets: {}", e))?;

    if count > 0 {
        return Err(format!("Essa categoria possui {} snippet(s) e não pode ser excluída.", count));
    }
    conn.execute(
        "DELETE FROM categories WHERE id = ?1",
        params![id],
    ).map_err(|e| format!("Erro ao excluir categoria: {}", e))?;

    Ok(())
}

