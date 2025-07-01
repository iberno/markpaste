use std::sync::Mutex;
use rusqlite::{Connection, Result};

pub struct DbConnection(pub Mutex<Connection>);

impl DbConnection {
    pub fn init() -> Result<Self> {
        let conn = Connection::open("markpaste.db")?;
        Self::create_tables(&conn)?;
        Ok(Self(Mutex::new(conn)))
    }

    fn create_tables(conn: &Connection) -> Result<()> {
        conn.execute(
            "CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL
            )", [],
        )?;

        conn.execute(
            "CREATE TABLE IF NOT EXISTS snippets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                category_id INTEGER,
                FOREIGN KEY (category_id) REFERENCES categories(id)
            )", [],
        )?;

        Ok(())
    }
}
