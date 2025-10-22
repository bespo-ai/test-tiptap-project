import { Node } from '@tiptap/core'

// Custom document node that only allows our custom blocks at the root level
export const DocExtension = Node.create({
  name: 'doc',
  topNode: true,
  content: '(textBlock | codeBlockCustom | aiBlockReact)+',
})

