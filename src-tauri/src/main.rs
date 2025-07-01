#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod categories;
mod snippets;

use tauri::Builder;
use db::DbConnection;
use categories::{
    create_category, get_all_categories, get_category,
    update_category, delete_category
};

use snippets::{
    create_snippet,
    get_all_snippets,
    get_snippet,
    update_snippet,
    delete_snippet
};

fn main() {
    Builder::default()
        .manage(DbConnection::init().expect("Erro ao iniciar conexão"))
        .invoke_handler(tauri::generate_handler![
            create_category,
            get_all_categories,
            get_category,
            update_category,
            delete_category,
            create_snippet,
            get_all_snippets,
            get_snippet,
            update_snippet,
            delete_snippet
        ])
        .run(tauri::generate_context!())
        .expect("Erro ao iniciar o app");
}
