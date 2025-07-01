import { invoke } from '@tauri-apps/api/core'
import { useEffect, useState } from 'react'

export default function App() {
  const [categorias, setCategorias] = useState([])

  const criarCategoria = async () => {
    await invoke('create_category', { name: '💡 Teste de Categoria' })
    carregarCategorias()
  }

  const carregarCategorias = async () => {
    const result = await invoke('get_all_categories')
    setCategorias(result)
  }


  useEffect(() => {
    carregarCategorias()
  }, [])

  return (
    <div className="p-6">
      <button onClick={criarCategoria} className="bg-green-600 text-white px-4 py-2 rounded">
        Criar Categoria
      </button>

      <ul className="mt-4">
        {categorias.map(cat => (
          <li key={cat.id} className="border-b py-1">{cat.name}</li>
        ))}
      </ul>
    </div>
  )
}
