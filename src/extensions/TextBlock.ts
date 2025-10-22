import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { BlockWithMenu } from './BlockWithMenu'

const TextBlockComponent = (props: any) => {
  return (
    <BlockWithMenu editor={props.editor} getPos={props.getPos} node={props.node}>
      <NodeViewWrapper as="div" className="text-block" data-type="text-block">
        <NodeViewContent />
      </NodeViewWrapper>
    </BlockWithMenu>
  )
}

export const TextBlock = Node.create({
  name: 'textBlock',

  group: 'block',

  content: 'block+',

  draggable: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('data-id'),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {}
          }
          return {
            'data-id': attributes.id,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="text-block"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'text-block',
        class: 'text-block',
      }),
      0,
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(TextBlockComponent)
  },

  addCommands() {
    return {
      setTextBlock: () => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          content: [
            {
              type: 'paragraph',
            },
          ],
        })
      },
    }
  },
})

