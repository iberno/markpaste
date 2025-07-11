import { useState } from 'react'

export default function Sidebar({
  categories = [],
  snippets = [],
  selectedId,
  onSelect,
  onDelete,
  onEdit,
  onCollapse,
  onCreateSnippet,
  onDeleteSnippet
}) {
  const [collapsed, setCollapsed] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [editedName, setEditedName] = useState('')

  const toggleCategory = (id) => {
    setCollapsed(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const snippetsPorCategoria = (catId) =>
    snippets.filter(snip => snip.category_id === catId)

  return (
    <div className="w-64 h-full overflow-y-auto bg-zinc-900 border-r border-zinc-800 transition-all duration-700 ease-in-out">
      {/* Topo */}
      <div className="flex justify-between items-center mb-4 h-12 px-4 border-b border-zinc-800">
        <h2 className="text-sm uppercase font-bold text-zinc-500">Snippets</h2>
        <button
          onClick={onCollapse}
          title="Esconder Sidebar"
          className="text-zinc-500 hover:text-white text-xs"
        >
          ❌
        </button>
      </div>

      {categories.length === 0 && (
        <p className="text-sm text-gray-500 px-4">Nenhuma categoria ainda.</p>
      )}

      {categories.map(cat => {
        const related = snippetsPorCategoria(cat.id)
        const isCollapsed = collapsed[cat.id]

        return (
          <div key={cat.id} className="mb-4 ml-4">
            {/* Cabeçalho da Categoria */}
            <div
              onClick={() => toggleCategory(cat.id)}
              className="flex items-center justify-between cursor-pointer pr-4 select-none"
            >
              {editingId === cat.id ? (
                <input
                  autoFocus
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onBlur={async () => {
                    try {
                      if (editedName.trim() && editedName !== cat.name) {
                        await onEdit?.(cat.id, editedName.trim())
                      }
                    } catch (err) {
                      console.error('Erro ao editar categoria:', err)
                    } finally {
                      setEditingId(null)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Escape') {
                      e.target.blur()
                    }
                  }}
                  className="bg-zinc-800 border border-zinc-600 text-sm rounded px-2 py-0.5 text-white w-full"
                />
              ) : (
                <h3
                  onDoubleClick={() => {
                    setEditingId(cat.id)
                    setEditedName(cat.name)
                  }}
                  className="text-sm uppercase font-bold text-zinc-300 hover:underline"
                  title="Duplo clique para editar"
                >
                  {cat.name}
                </h3>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onCreateSnippet?.(cat.id)
                  }}
                  title="Novo snippet"
                  className="text-green-500 hover:text-green-400 text-xs"
                >
                  ➕
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete?.(cat.id)
                  }}
                  className="text-red-600 hover:text-red-800 text-xs"
                  title="Excluir categoria"
                >
                  🗑
                </button>
              </div>
            </div>

            {/* Snippets */}
            <div
              className={`transition-all duration-700 overflow-hidden ${
                isCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
              }`}
            >
              <ul className="ml-2 mt-2 space-y-1">
                {related.map(snip => (
                  <li
                    key={snip.id}
                    className={`group flex justify-between items-center text-sm px-2 py-1 rounded ${
                      selectedId === snip.id
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                    onClick={() => onSelect?.(snip)}
                  >
                    <span className="truncate">
                      {snip.title || '📝 (sem título)'}
                    </span>
                    <button
                      title="Excluir snippet"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteSnippet?.(snip.id)
                      }}
                      className="opacity-0 group-hover:opacity-100 text-xs text-red-400 hover:text-red-600"
                    >
                      🗑
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}
