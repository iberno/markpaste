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
    {/* Topbar global */}
    <Topbar onAction={handleAction} />

    {/* Conteúdo */}
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <Sidebar data={sampleData} onSelect={setContent} />

      {/* Editor + Preview + Toolbar */}
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

    {/* Footer */}
    <Footer />
  </div>
)
}
export default App;
