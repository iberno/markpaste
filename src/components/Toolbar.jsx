// src/components/Toolbar.jsx
import { FaBold, FaItalic, FaHeading, FaListUl, FaQuoteRight, FaCode, FaLink, FaImage, FaCheckSquare } from 'react-icons/fa'

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
    <div className="flex items-center gap-2 bg-zinc-800 p-2 rounded text-white text-sm">
      {buttons.map((btn, i) => (
        <button
          key={i}
          onClick={() => onAction(btn.action)}
          title={btn.label}
          className="hover:bg-zinc-700 p-2 rounded"
        >
          {btn.icon}
        </button>
      ))}
    </div>
  )
}
