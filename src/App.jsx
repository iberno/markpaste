import { useState, useRef } from "react";
import Topbar from "./components/TopBar.jsx"
import Toolbar from "./components/Toolbar"
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor"
import Preview from "./components/Preview";
import Footer from "./components/Footer.jsx";

import { applyMarkdownFormatting } from "./utils/formatMarkdown";
import "./styles/tailwind.css";
import sampleData from "./database/sampleData.js";

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [content, setContent] = useState('')
  const textareaRef = useRef(null)

const handleAction = (action) => {
  switch (action) {
    case 'new':
      setContent('')
      break
    case 'save':
      console.log('🚧 Salvar ainda não implementado')
      break
    case 'open':
      console.log('🚧 Abrir ainda não implementado')
      break
    case 'export':
      console.log('🚧 Exportar ainda não implementado')
      break
    default:
      // markdown formatting (bold, italic, etc)
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
return (
  <div className="h-screen flex flex-col bg-zinc-950 text-white overflow-hidden">
    {/* 🔝 Topbar global com ações: novo, salvar etc */}
    <Topbar onAction={handleAction} />

    {/* 🖥️ Área principal: Sidebar + Editor + Preview */}
    <div className="flex flex-1 overflow-hidden">
      {/* 📁 Sidebar ou aba colapsada */}
      {sidebarVisible ? (
        <div className="transition-all duration-700 ease-in-out w-64 bg-zinc-900 border-r border-zinc-800 overflow-hidden">
          <Sidebar
            data={sampleData}
            onSelect={setContent}
            onCollapse={() => setSidebarVisible(false)}
          />
        </div>
      ) : (
        <div className="transition-all duration-700 ease-in-out  w-6 bg-zinc-900 border-r border-zinc-800 flex items-start justify-center">
          <button
            onClick={() => setSidebarVisible(true)}
            className="mt-2 text-zinc-400 hover:text-white text-xs"
            title="Mostrar Sidebar"
          >
            📂
          </button>
        </div>
      )}

      {/* Área de edição e preview */}
      <div className="flex flex-col flex-1">
        {/* 🎨 Toolbar de formatação Markdown */}
        <Toolbar onAction={handleAction} />

        {/* ✍️ Editor | 📄 Preview */}
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

    {/* 🔻 Rodapé */}
    <Footer />
  </div>
)
}
export default App;
