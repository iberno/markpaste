import { marked } from 'marked'
export default function Preview({ content }) {
    return (
        <div 
            className="w-full h-full overflow-auto p-4 prose prose-invert max-w-none bg-zinc-900 border-l border-zinc-800"
            dangerouslySetInnerHTML={{ __html: marked.parse(content || '') }}
        >
        </div>
    )
}