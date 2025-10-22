import { Editor } from '@tiptap/react'
import { useState, useRef } from 'react'
import BlockInsertMenu from './BlockInsertMenu'
import './AddBlockButton.css'

interface AddBlockButtonProps {
  editor: Editor
}

const AddBlockButton = ({ editor }: AddBlockButtonProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    setShowMenu(!showMenu)
  }

  // Insert at the end of the document
  const insertPosition = editor.state.doc.content.size

  return (
    <div className="add-block-button-wrapper">
      <button
        ref={buttonRef}
        className="add-block-button"
        onClick={handleClick}
        title="Add block at the end"
      >
        <span className="plus-icon">+</span>
        <span className="add-block-text">Add Block</span>
      </button>
      {showMenu && (
        <BlockInsertMenu
          editor={editor}
          position={insertPosition}
          onClose={() => setShowMenu(false)}
          buttonRef={buttonRef.current}
        />
      )}
    </div>
  )
}

export default AddBlockButton

