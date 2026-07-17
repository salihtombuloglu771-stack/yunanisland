function parseInline(text: string, keyPrefix: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export function MarkdownContent({ content, className }: { content: string; className?: string }) {
  const paragraphs = content.split(/\n\s*\n/)
  return (
    <>
      {paragraphs.map((para, i) => (
        <p key={i} className={className}>
          {parseInline(para, `p${i}`)}
        </p>
      ))}
    </>
  )
}
