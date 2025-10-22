import { Editor } from '@tiptap/react'
import { useState, useRef, useEffect } from 'react'
import './BlockInsertMenu.css'

interface BlockInsertMenuProps {
  editor: Editor
  position: number
  onClose: () => void
  buttonRef: HTMLElement | null
}

const BlockInsertMenu = ({ editor, position, onClose, buttonRef }: BlockInsertMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    if (buttonRef && menuRef.current) {
      const buttonRect = buttonRef.getBoundingClientRect()
      const menuRect = menuRef.current.getBoundingClientRect()
      
      setMenuStyle({
        position: 'fixed',
        top: `${buttonRect.bottom + 5}px`,
        left: `${buttonRect.left - menuRect.width / 2 + buttonRect.width / 2}px`,
        zIndex: 1000,
      })
    }
  }, [buttonRef])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef &&
        !buttonRef.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose, buttonRef])

  const insertBlock = (type: 'text' | 'code' | 'ai') => {
    editor.chain().focus()
    
    if (type === 'text') {
      editor.chain().insertContentAt(position, {
        type: 'textBlock',
        content: [{ type: 'paragraph' }],
      }).run()
    } else if (type === 'code') {
      editor.chain().insertContentAt(position, {
        type: 'codeBlockCustom',
        attrs: { language: 'javascript' },
      }).run()
    } else if (type === 'ai') {
      editor.chain().insertContentAt(position, {
        type: 'aiBlockReact',
      }).run()
    }
    
    onClose()
  }

  return (
    <div ref={menuRef} className="block-insert-menu" style={menuStyle}>
      <button
        className="block-insert-menu-item"
        onClick={() => insertBlock('text')}
      >
        <span className="block-insert-icon">📝</span>
        <span className="block-insert-label">Text Block</span>
      </button>
      <button
        className="block-insert-menu-item"
        onClick={() => insertBlock('code')}
      >
        <span className="block-insert-icon">💻</span>
        <span className="block-insert-label">Code Block</span>
      </button>
      <button
        className="block-insert-menu-item ai"
        onClick={() => insertBlock('ai')}
      >
        <span className="block-insert-icon">✨</span>
        <span className="block-insert-label">AI Block</span>
      </button>
    </div>
  )
}

export default BlockInsertMenu

