import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { BlockWithMenu } from './BlockWithMenu'

const CodeBlockComponent = (props: any) => {
  const language = props.node.attrs.language || 'javascript'
  const isAiGenerated = props.node.attrs.aiGenerated

  return (
    <NodeViewWrapper className={`code-block-wrapper ${isAiGenerated ? 'ai-generated-wrapper' : ''}`}>
      <BlockWithMenu editor={props.editor} getPos={props.getPos} node={props.node}>
        <div
          className={`code-block-custom ${isAiGenerated ? 'ai-generated' : ''}`}
          data-type="code-block-custom"
          data-language={language}
          data-ai-generated={isAiGenerated || undefined}
        >
          {isAiGenerated && (
            <div className="ai-badge-code">
              <span className="ai-badge-text">AI</span>
            </div>
          )}
          <pre>
            <NodeViewContent as="code" />
          </pre>
        </div>
      </BlockWithMenu>
    </NodeViewWrapper>
  )
}

export const CodeBlockCustom = Node.create({
  name: 'codeBlockCustom',

  group: 'block',

  content: 'text*',

  marks: '',

  code: true,

  defining: true,

  draggable: true,

  addAttributes() {
    return {
      language: {
        default: 'javascript',
        parseHTML: element => element.getAttribute('data-language'),
        renderHTML: attributes => {
          return {
            'data-language': attributes.language,
          }
        },
      },
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
        tag: 'div[data-type="code-block-custom"]',
        preserveWhitespace: 'full',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'code-block-custom',
        class: 'code-block-custom',
      }),
      [
        'pre',
        {},
        ['code', {}, 0],
      ],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent)
  },

  addCommands() {
    return {
      setCodeBlockCustom: (attributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        })
      },
    }
  },
})

