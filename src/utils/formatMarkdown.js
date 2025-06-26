export function applyMarkdownFormating(text, selectionStart, selectionEnd, action) {
    const selected = text.slice(selectionStart, selectionEnd)
    let formatted = selected
    switch (action) {
        case 'bold':
            formatted = `**${selected || 'negrito'}**`            
            break;
        case 'italic': 
            formatted = `*${selected || 'itálico'}*`
            break
        case 'heading': `# ${selected || 'Título'}`
            break
        case 'list':
            formatterd = `- ${selected || 'Item de Lista'}`
            break
        case 'quote':
            formatterd = `> ${selected || 'Citação'}`
            break
        case 'code':
            formatterd = `\`\`\`\n${selected || 'código'}\n\`\`\``
            break
        case 'link':
            formatterd = `[${selected || 'texto'}](https://)`
            break
        case 'image':
            formatterd = `[${selected || 'imagem'}](https://)`
            break
        case 'checklist':
            formatterd = `- [ ] ${selected || 'Tarefa'}`
            break 
        default: 
            return text;
    }
    return (
        text.slice(0, selectionStart) + 
        formatted +
        text.slice(selectionEnd)
    )
}