import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'
import mcfunction from 'highlight.js/lib/languages/haskell'

export default function Markdown(props: { children: string }) {
  return (
    <ReactMarkdown rehypePlugins={[[rehypeHighlight, { languages: { mcfunction } }]]}>
      {props.children}
    </ReactMarkdown>
  )
}
