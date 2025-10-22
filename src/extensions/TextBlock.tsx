import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { BlockWithMenu } from './BlockWithMenu'

const TextBlockComponent = (props: any) => {
  const isAiGenerated = props.node.attrs.aiGenerated
  
  return (
    <NodeViewWrapper className={`text-block-wrapper ${isAiGenerated ? 'ai-generated-wrapper' : ''}`}>
      <BlockWithMenu editor={props.editor} getPos={props.getPos} node={props.node}>
        <div 
          className={`text-block ${isAiGenerated ? 'ai-generated' : ''}`}
          data-type="text-block"
          data-ai-generated={isAiGenerated || undefined}
        >
          {isAiGenerated && (
            <div className="ai-badge">
              <span className="ai-badge-text">AI</span>
            </div>
          )}
          <NodeViewContent />
        </div>
      </BlockWithMenu>
    </NodeViewWrapper>
  )
}

export const TextBlock = Node.create({
  name: 'textBlock',

  group: 'block',

  content: 'paragraph+',

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
      aiGenerated: {
        default: null,
        parseHTML: element => element.getAttribute('data-ai-generated'),
        renderHTML: attributes => {
          if (!attributes.aiGenerated) {
            return {}
          }
          return {
            'data-ai-generated': attributes.aiGenerated,
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

