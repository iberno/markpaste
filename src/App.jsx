import { useState, useRef } from 'react'

// Componentes de UI
import Topbar from './components/TopBar'
import Toolbar from './components/Toolbar'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Footer from './components/Footer'

// Hooks e utils
import useCategories from './hooks/useCategories'
import useSnippets from './hooks/useSnippets'
import { applyMarkdownFormatting } from './utils/formatMarkdown'

import './styles/tailwind.css'

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [content, setContent] = useState('')
  const [selectedSnippet, setSelectedSnippet] = useState(null)
  const textareaRef = useRef(null)
  const [snippetSelecionado, setSnippetSelecionado] = useState(null)
  const [draft, setDraft] = useState({ title: '', content: '' })

  const {
    categories,
    addCategory,
    editCategory,
    removeCategory
  } = useCategories()

  const {
    snippets,
    addSnippet,
    editSnippet,
    removeSnippet,
    reload: reloadSnippets
  } = useSnippets()

  const salvarSnippet = async () => {
    if (!snippetSelecionado) return
    await editSnippet(
      snippetSelecionado.id,
      draft.title.trim(),
      draft.content,
      snippetSelecionado.category_id
    )
  }
  const handleAction = async (action) => {
    switch (action) {
      case 'new': {
        const defaultCategory = 'Nova Categoria'
        const existing = categories.find(c => c.name === defaultCategory)
        const categoryId = existing?.id

        if (!existing) {
          await addCategory(defaultCategory)
          await reloadSnippets()
        }

        const novaCategoria = categories.find(c => c.name === defaultCategory)
        const newSnippet = {
          title: 'Novo Snippet',
          content: '',
          categoryId: novaCategoria?.id
        }

        await addSnippet(newSnippet)
        await reloadSnippets()
        setContent('# Novo Snippet')
        setSelectedSnippet(null)
        break
      }

      case 'save': {
        if (!selectedSnippet) return
        await editSnippet({
          ...selectedSnippet,
          content
        })
        break
      }

      default: {
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
      <Topbar onAction={handleAction} />

      <div className="flex flex-1 overflow-hidden">
        {sidebarVisible ? (
          <div className="w-64 bg-zinc-900 border-r border-zinc-800 overflow-hidden">
            <Sidebar
              categories={categories}
              snippets={snippets}
              selectedId={snippetSelecionado?.id}
              onSelect={(snip) => {
                setSnippetSelecionado(snip)
                setDraft({ title: snip.title, content: snip.content })
              }}
              onEdit={editCategory}
              onDelete={removeCategory}
              onCreateSnippet={(catId) => addSnippet('Novo Snippet', '', catId)}
              onDeleteSnippet={(id) => removeSnippet(id)}
              onCollapse={() => {}}
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
        )}
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
        </div>
      </div>

      <Footer />
    </div>
  )
}
