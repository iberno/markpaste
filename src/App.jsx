import { useState } from "react";
import Toolbar from "./components/Toolbar"
import Editor from "./components/Editor"
import "./styles/tailwind.css";

function App() {
  const [content, setContent] = useState('')
  const handleAction = (action) => {
    //Aqui será aplicado a formatação no texto
    console.log('Ação', action)
  }
  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-white">
      <Toolbar onAction={handleAction} />
      <Editor    content={content} setContent={setContent} />
    </div>
  );
}

export default App;
