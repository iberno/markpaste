import { useEffect, useRef } from 'react';
export default function Editor({ content, setContent, onRefReady }) {
    const textareaRef = useRef(null)
    // Envia a referencia para o App acessar
    useEffect(() => {
        if (onRefReady && textareaRef.current) {
            onRefReady(textareaRef)
        }
    }, [onRefReady])
    return (
        <textarea
            ref={textareaRef}
            value={content} 
            onChange={(e) => setContent(e.target.valeu)}
            className="w-full h-full bg-zinc-900 text-white p-4 presize-none outline-none font-mono"
            placeholder="Escreva seu Markdown aqui..."
        />
    );
}