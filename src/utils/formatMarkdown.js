export function applyMarkdownFormatting(text = '', selectionStart = 0, selectionEnd = 0, action) {
    if (typeof text !== 'string') return ''
    const selected = text.slice(selectionStart, selectionEnd) || ''
    let formatted = ''        
    switch (action) {
        case 'bold':
            formatted = `** ${selected || 'negrito'} **`            
            break;
        case 'italic': 
            formatted = `* ${selected || 'itálico'}*`
            break
        case 'heading': `# ${selected || 'Título'}`
            break
        case 'list':
            formatted = `- ${selected || 'Item de Lista'}`
            break
        case 'quote':
            formatted = `> ${selected || 'Citação'}`
            break
        case 'code':
            formatted = `\`\`\`\n${selected || 'código'}\n\`\`\``
            break
        case 'link':
            formatted = `[${selected || 'texto'}](https://)`
            break
        case 'image':
            formatted = `![${selected || 'imagem'}](https://)`
            break
        case 'checklist':
            formatted = `- [ ] ${selected || 'Tarefa'}`
            break 
            console.log('Ação:', action, '| Texto selecionado:', selected)
        default: 
            return text;
    }  
        return text.slice(0, selectionStart) + formatted + text.slice(selectionEnd)
}