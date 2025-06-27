// src/components/Toolbar.jsx
import { FaPlus, FaSave, FaFolderOpen, FaFileExport, FaBold, FaItalic, FaHeading, FaListUl, FaQuoteRight, FaCode, FaLink, FaImage, FaCheckSquare } from 'react-icons/fa'

export default function Toolbar({ onAction }) {
  const buttons = [
    { icon: <FaBold />, action: 'bold', label: 'Negrito (Ctrl+B)' },
    { icon: <FaItalic />, action: 'italic', label: 'Itálico (Ctrl+I)' },
    { icon: <FaHeading />, action: 'heading', label: 'Título (Ctrl+H)' },
    { icon: <FaListUl />, action: 'list', label: 'Lista (Ctrl+U)' },
    { icon: <FaQuoteRight />, action: 'quote', label: 'Citação (Ctrl+>)' },
    { icon: <FaCode />, action: 'code', label: 'Código (```)' },
    { icon: <FaLink />, action: 'link', label: 'Link' },
    { icon: <FaImage />, action: 'image', label: 'Imagem' },
    { icon: <FaCheckSquare />, action: 'checklist', label: 'Checklist' },
  ]

  return (
    <div className="h-12 flex items-center gap-2 justify-between p-4 border-b border-zinc-800 bg-zinc-900 text-md">
      <div className="flex gap-3">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => onAction(btn.action)}
            title={btn.label}
            className="flex items-center rounded p-2 hover:bg-zinc-800 "
          >
            {btn.icon}
            {/*<span className="hidden sm:inline">{btn.label}</span>*/}
          </button>
        ))}
      </div>
    </div>
  )
}
