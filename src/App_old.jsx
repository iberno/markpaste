import { useState, useRef } from "react"

// Componentes da interface
import Topbar from "./components/TopBar"
import Toolbar from "./components/Toolbar"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Preview from "./components/Preview"
import Footer from "./components/Footer"

// Hooks e APIs
//import useSnippets from "./hooks/useSnippets"
import { createSnippet } from "./api/snippets"
import { createCategory, getCategoryIdByName } from "./api/categories"
import { applyMarkdownFormatting } from "./utils/formatMarkdown"

import "./styles/tailwind.css"

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [content, setContent] = useState('')
  const textareaRef = useRef(null)

  // Carrega os snippets agrupados por categoria
  //const { snippets, reload, loading } = useSnippets()

  // 🎯 Função chamada ao clicar em ícones da Topbar (Novo, Salvar, etc)
  const handleAction = async (action) => {
    switch (action) {
      case 'new': {
        const defaultCategory = 'Rascunhos'

        // Garante que a categoria exista no banco
        await createCategory(defaultCategory).catch(() => {
          /* ignora erro se já existir */
        })

        // Busca o ID da categoria criada
        const category_id = await getCategoryIdByName(defaultCategory)

        // Cria um novo snippet associado à categoria
        await createSnippet({
          title: 'Novo Snippet',
          content: '',
          category_id,
        })

        await reload()
        setContent('# Novo Snippet')
        break
      }

      case 'save':
        console.log('🚧 Salvar ainda não implementado')
        break

      case 'open':
        console.log('🚧 Abrir ainda não implementado')
        break

      case 'export':
        console.log('🚧 Exportar ainda não implementado')
        break

      default: {
        // Formatação Markdown (bold, italic, etc)
        const textarea = textareaRef.current
        if (!textarea) return
        const { selectionStart, selectionEnd } = textarea
        const updated = applyMarkdownFormatting(content || '', selectionStart, selectionEnd, action)
        setContent(updated)

        setTimeout(() => {
          textarea.focus()
          textarea.selectionStart = textarea.selectionEnd = selectionEnd + 2
        }, 0)
      }
    }
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-white overflow-hidden">
      {/* 🔝 Topbar com ícones de ação */}
      <Topbar onAction={handleAction} />
    
      <div className="flex flex-1 overflow-hidden">
        {/* 📁 Sidebar com lista de snippets agrupados por categoria
        {sidebarVisible ? (
          <div className="w-64 bg-zinc-900 border-r border-zinc-800 overflow-hidden">
            <Sidebar
              data={snippets}
              onSelect={setContent}
              onCollapse={() => setSidebarVisible(false)}
            />
          </div>
        ) : (
          <div className="w-6 bg-zinc-900 border-r border-zinc-800 flex items-start justify-center">
            <button
              onClick={() => setSidebarVisible(true)}
              className="mt-2 text-zinc-400 hover:text-white text-xs"
              title="Mostrar Sidebar"
            >
              📂
            </button>
          </div>
        )} */}

        {/* ✍️ Editor + 📄 Preview lado a lado
        <div className="flex flex-col flex-1">
          <Toolbar onAction={handleAction} />

          <div className="flex flex-1 overflow-hidden border-t border-zinc-800">
            <div className="w-1/2 border-r border-zinc-800">
              <Editor
                content={content}
                setContent={setContent}
                onRefReady={(ref) => (textareaRef.current = ref?.current)}
              />
            </div>
            <div className="w-1/2">
              <Preview content={content} />
            </div>
          </div>
        </div>*/}
      </div>

      {/* 🔻 Rodapé */}
      <Footer /> 
    </div>
  )
}
