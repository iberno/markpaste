function Editor({ content, setContent }) {
    return (
        <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.valeu)}
            className="w-full h-full bg-zinc-900 text-white p-4 presize-none outline-none font-mono"
            placeholder="Escreva seu Markdown aqui..."
        />
    );
}
export default Editor;