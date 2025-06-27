export default function Sidebar({ data, onSelect}){
    return (
        <div className="w-64 h-full overflow-y-auto bg-zinc-900 border-r border-zinc-800 p-4">
            {data.map((cat) => (
                <div key={cat.id} className="mb-4">
                    <h3 className="text-sm uppercase font-bold text-zinc-400">{cat.name}</h3>
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