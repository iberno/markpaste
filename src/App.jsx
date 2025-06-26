import { useState, useRef } from "react";
import Toolbar from "./components/Toolbar"
import Editor from "./components/Editor"
import Preview from "./components/Preview";

import { applyMarkdownFormatting } from "./utils/formatMarkdown";
import "./styles/tailwind.css";

function App() {
  const [content, setContent] = useState('')
  const textareaRef = useRef(null)

  const handleAction = (action) => {
    const textarea = textareaRef.current
    if (!textarea) return
      const { selectionStart, selectionEnd } = textarea
      const updated = applyMarkdownFormatting(content || '', selectionStart, selectionEnd, action)
      setContent(updated)
    
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = textarea.selectionEnd + 2 
      textarea.selectionEnd = selectionEnd + 2
    }, 0)
  }
  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-white">
      <Toolbar onAction={handleAction} />
        <div className="flex flex-1 overflow-hidden">
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
  );
}

export default App;
