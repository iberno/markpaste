export default function Sidebar({ data, onSelect, onCollapse}){
    return (
        <div className="w-64 h-full overflow-y-auto bg-zinc-900 border-r border-zinc-800">
            {/* Topo da Sidebar com botão de fechar */}
            <div className="flex justify-between items-center mb-4 h-12 px-4 border-b border-zinc-800">
                <h2 className="text-sm uppercase font-bold text-zinc-500">Snippets</h2>
                <button
                onClick={onCollapse}
                title="Esconder Sidebar"
                className="text-zinc-500 hover:text-white text-xs"
                >
                ❌
                </button>
            </div>
            {data.map((cat) => (
                <div key={cat.id} className="mb-4 ml-4">
                    <h3 className="text-sm uppercase font-bold text-zinc-300">{cat.name}</h3>
                    <ul className="ml-2 mt-2 space-y-1">
                        {cat.snippets.map((snip) => (
                            <li
                                key={snip.id}
                                onClick={() => onSelect(snip.content)}
                                className="cursor-pointer text-zinc-300 hover:text-white"
                            >
                                {snip.title}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}