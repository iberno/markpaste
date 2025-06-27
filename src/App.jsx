import { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar"
import Editor from "./components/Editor"
import Preview from "./components/Preview";

import { applyMarkdownFormatting } from "./utils/formatMarkdown";
import "./styles/tailwind.css";
import sampleData from "./database/sampleData.js";

function App() {
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
    {/* 🔝 Topbar */}
    <Toolbar onAction={handleAction} />

    {/* 📄 Conteúdo principal */}
    <div className="flex flex-1 overflow-hidden">
      {/* 📁 Sidebar de Snippets */}
      <Sidebar data={sampleData} onSelect={setContent} />

      {/* ✍️ Editor + 📄 Preview */}
      <div className="flex flex-1 overflow-hidden border-l border-zinc-800">
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
)
}
export default App;
