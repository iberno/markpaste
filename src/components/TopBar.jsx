import { FaBars, FaPlus, FaSave, FaFolderOpen, FaFileExport } from 'react-icons/fa'

export default function Topbar({ onAction, onNewSnippet }) {
  const buttons = [
    { icon: <FaPlus />, action: 'new', label: 'Novo' },
    { icon: <FaSave />, action: 'save', label: 'Salvar' },
    { icon: <FaFolderOpen />, action: 'open', label: 'Abrir' },
    { icon: <FaFileExport />, action: 'export', label: 'Exportar' },
  ]

  return (
    <div className="h-12 flex items-center justify-between px-4 border-b border-zinc-800 bg-zinc-900 text-sm">
      <div className="font-bold tracking-wide">📄 MarkPaste</div>
      <div className="flex gap-3">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => onAction(btn.action)}
            title={btn.label}
            className="flex items-center gap-1 hover:text-zinc-300"
          >
            {btn.icon}
            <span className="hidden sm:inline">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
