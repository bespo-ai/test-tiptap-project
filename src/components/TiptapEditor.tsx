import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { TextBlock } from '../extensions/TextBlock.tsx'
import { CodeBlockCustom } from '../extensions/CodeBlockCustom.tsx'
import { AIBlockReact } from '../extensions/AIBlockReact.tsx'
import { DocExtension } from '../extensions/DocExtension'
import AddBlockButton from './AddBlockButton'
import './TiptapEditor.css'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      DocExtension,
      StarterKit.configure({
        // Disable document node (using custom one)
        document: false,
        // Disable default code block since we have custom one
        codeBlock: false,
        // Keep only inline formatting
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        horizontalRule: false,
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Click + to add a block below...',
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      TextBlock,
      CodeBlockCustom,
      AIBlockReact,
    ],
    content: {
      type: 'doc',
      content: [
        {
          type: 'textBlock',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Welcome to the Jupyter-style block editor! 🎉',
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Hover over this block and click the + button below to add more blocks.',
                },
              ],
            },
          ],
        },
      ],
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
  })

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  if (!editor) {
    return null
  }

  return (
    <div className="editor-container">
      <BubbleMenu editor={editor} className="bubble-menu">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive('highlight') ? 'is-active' : ''}
          title="Highlight"
        >
          H
        </button>
        <span className="divider" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          title="Heading 3"
        >
          H3
        </button>
        <span className="divider" />
        <button
          onClick={setLink}
          className={editor.isActive('link') ? 'is-active' : ''}
          title="Add Link"
        >
          🔗
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
          title="Code"
        >
          {'</>'}
        </button>
      </BubbleMenu>

      <EditorContent editor={editor} />
      <AddBlockButton editor={editor} />
      <div className="character-count">
        {editor.storage.characterCount.characters()} / {editor.extensionManager.extensions.find(ext => ext.name === 'characterCount')?.options.limit || 0} characters
      </div>
    </div>
  )
}

export default TiptapEditor

