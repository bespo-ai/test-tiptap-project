# Tiptap 3.0 Test Project

A Jupyter-style block-based editor built with **Tiptap 3.0**, React, and TypeScript. This project demonstrates advanced Tiptap features including custom node extensions, React NodeViews, and a sophisticated AI-powered block system.

## 🎯 What's New in Tiptap 3.0

- **Full TypeScript Integration** - Complete type safety throughout the editor
- **Server-Side Compatibility** - Render content on the server
- **JSX Support** - Use JSX for custom extensions
- **Consolidated Extensions** - Streamlined package structure with `@tiptap/pm`
- **React NodeViews** - Build custom nodes with React components
- **Built on ProseMirror** - Powerful document editing foundation
- **BubbleMenu from `@tiptap/react/menus`** - New menu system with Floating UI

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm**, yarn, or pnpm
- Modern browser with JavaScript enabled

### Installation

```bash
# Navigate to the project directory
cd test-tiptap-project

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will be available at `http://localhost:3001` (or another port if 3001 is in use).

### Build for Production

```bash
# Build optimized production bundle
npm run build
# or
yarn build
# or
pnpm build
```

The build output will be in the `dist/` directory.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

### Deploy to GitHub Pages

This project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys to GitHub Pages.

#### Setup Steps:

1. **Push this repository to GitHub** (if you haven't already)
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save

3. **Wait for Deployment**
   - The workflow automatically triggers on push
   - Check the **Actions** tab to monitor progress
   - Build takes ~1-2 minutes
   - Once complete (green checkmark), your site is live at:
     ```
     https://YOUR_USERNAME.github.io/test-tiptap-project/
     ```

#### Workflow Features:

- ✅ **Auto-deploy** on every push to `main`
- ✅ **Manual trigger** via Actions tab → "Run workflow"
- ✅ **Build caching** for faster subsequent builds
- ✅ **Concurrent deployment protection**
- ✅ **Proper base path** configuration for GitHub Pages

#### Troubleshooting Deployment:

If deployment fails:
1. Check **Actions** tab for error logs
2. Ensure GitHub Pages is enabled in Settings
3. Verify you have write permissions for GitHub Pages
4. Make sure the build succeeds locally: `npm run build`

## 📦 Architecture Overview

### Core Technologies

- **Tiptap 3.0** - Headless editor framework
- **ProseMirror** - Document model and editing engine
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Floating UI** - Positioning for bubble menus

### Custom Extensions

This project includes several custom Tiptap node extensions:

1. **DocExtension** - Custom document node that enforces flat block structure
2. **TextBlock** - Rich text container with paragraph support
3. **CodeBlockCustom** - Code editor with language indicator
4. **AIBlockReact** - Interactive AI block with React NodeView

### Built-in Extensions

- **StarterKit** (configured) - Basic formatting (bold, italic, strike, code, etc.)
- **Underline** - Underline text formatting
- **Placeholder** - Placeholder text for empty editor
- **CharacterCount** - Track character count with 10,000 limit
- **Highlight** - Highlight text
- **TextAlign** - Align paragraphs
- **TextStyle & Color** - Custom text colors

## 🎨 Features

### 1. Jupyter-Style Block Structure

The editor uses a **flat block structure** similar to Jupyter notebooks:
- All blocks are siblings at the document root level
- No nested blocks (except AI-generated blocks can be nested conceptually)
- Sequential, linear document structure

### 2. Custom Block Types

#### 📝 Text Block
- Container for rich text paragraphs
- Blue left border accent
- Supports inline formatting (bold, italic, underline, etc.)
- Hover effects
- **AI-generated variant**: Purple gradient background with "AI" badge

#### 💻 Code Block
- Syntax-highlighted code editor
- Language indicator header (default: JavaScript)
- Monospace font with dark theme
- Preserves whitespace and formatting
- **AI-generated variant**: Purple border with "AI" badge

#### ✨ AI Block
- Interactive prompt textarea
- **"▶ Run" button** generates random blocks (demo mode)
- Purple gradient styling with sparkle icon
- Loading animation while generating
- **Cascading delete**: Deleting an AI block removes all its generated blocks

### 3. Block Management

#### Adding Blocks
- **"+" Button on Hover** - Appears below each block on hover
- **Insert Menu** - Click "+" to show menu with 3 options:
  - 📝 Text Block
  - 💻 Code Block  
  - ✨ AI Block
- **"Add Block" Button** - Large button at document end for easy access

#### Deleting Blocks
- **"×" Button** - Appears in top-right corner of each block on hover
- Click to delete that block
- **Cascading Delete**: Deleting an AI block also deletes all blocks it generated

### 4. AI Block System

#### Visual Connections
- **Indentation** - AI-generated blocks are indented 2rem
- **Vertical Line** - Solid purple line connects generated blocks
- **Horizontal Connectors** - Each block has a horizontal line to the vertical line
- **"AI" Badges** - Generated blocks show "AI" badge in top corner

#### Demo Behavior
When you click "Run" on an AI block:
1. Shows loading animation (1.5 seconds)
2. Generates 2-4 random blocks (mix of text and code)
3. Inserts them immediately after the AI block
4. Marks them with the AI block's unique ID
5. Applies purple styling and connecting lines

### 5. Text Formatting

#### Bubble Menu
- Appears when you select text
- Dark themed floating toolbar
- Options: Bold, Italic, Underline, Strike, Highlight, H2, H3, Link, Code
- Auto-positions using Floating UI

#### Inline Formatting
- **Bold**, *Italic*, <u>Underline</u>, ~~Strikethrough~~
- `Inline code`
- Highlights
- Links with URL prompt
- Text colors (via TextStyle & Color extensions)

### 6. UI/UX Features

- **Responsive Design** - Mobile-friendly layout
- **Dark Mode** - Full support with adjusted colors
- **Smooth Animations** - Hover effects, transitions, loading states
- **Draggable Blocks** - Reorder blocks by dragging
- **Character Count** - Shows count/limit at bottom
- **Clean Interface** - Minimal, focused editing experience

## 🏗️ Project Structure

```
test-tiptap-project/
├── src/
│   ├── components/
│   │   ├── TiptapEditor.tsx       # Main editor component
│   │   ├── TiptapEditor.css       # Editor and block styles
│   │   ├── BlockInsertMenu.tsx    # Popup menu for inserting blocks
│   │   ├── BlockInsertMenu.css    # Insert menu styles
│   │   ├── AddBlockButton.tsx     # "Add Block" button at document end
│   │   └── AddBlockButton.css     # Button styles
│   ├── extensions/
│   │   ├── DocExtension.ts        # Custom document node
│   │   ├── TextBlock.tsx          # Text block node with React view
│   │   ├── CodeBlockCustom.tsx    # Code block node with React view
│   │   ├── AIBlockReact.tsx       # AI block node with React view
│   │   ├── AIBlockReact.css       # AI block styles
│   │   ├── BlockWithMenu.tsx      # Wrapper adding +/× buttons
│   │   └── BlockWithMenu.css      # Button and menu styles
│   ├── App.tsx                    # Root app component
│   ├── App.css                    # App layout styles
│   ├── index.css                  # Global styles
│   └── main.tsx                   # React entry point
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript config
├── vite.config.ts                 # Vite build config
└── index.html                     # HTML entry point
```

## 🛠️ Technical Implementation

### Custom Node Extensions

All custom blocks use **React NodeViews** for rich interactivity:

```typescript
// Example: TextBlock with React NodeView
import { ReactNodeViewRenderer } from '@tiptap/react'

const TextBlockComponent = (props: any) => {
  return (
    <NodeViewWrapper>
      <BlockWithMenu {...props}>
        <div className="text-block">
          <NodeViewContent />
        </div>
      </BlockWithMenu>
    </NodeViewWrapper>
  )
}

export const TextBlock = Node.create({
  name: 'textBlock',
  addNodeView() {
    return ReactNodeViewRenderer(TextBlockComponent)
  },
})
```

### Document Schema

The custom document enforces a flat structure:

```typescript
export const DocExtension = Node.create({
  name: 'doc',
  topNode: true,
  content: '(textBlock | codeBlockCustom | aiBlockReact)+',
})
```

This ensures only our custom blocks can exist at the root level (Jupyter-style).

### AI Block ID System

AI blocks generate unique IDs and stamp their generated blocks:

```typescript
const aiBlockId = `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Generated blocks receive this ID
blocks.push({
  type: 'textBlock',
  attrs: { aiGenerated: aiBlockId },
  content: [...]
})
```

When the AI block is deleted, all blocks with matching `aiGenerated` attribute are removed.

## 🎓 Usage Guide

### Creating Blocks

1. **Start with empty editor** or use the "Add Block" button
2. **Click "+"** button below any block to insert a new block
3. **Select block type** from the menu (Text, Code, or AI)

### Using Text Blocks

- Type normally, press Enter for new paragraphs
- Select text to see **bubble menu** for formatting
- Use standard keyboard shortcuts (Cmd/Ctrl + B for bold, etc.)

### Using Code Blocks

- Type or paste code directly
- Language is shown in the header bar (currently hardcoded to JavaScript)
- Syntax highlighting applies automatically
- Whitespace and indentation preserved

### Using AI Blocks

1. **Insert AI block** via "+" menu
2. **Type a prompt** in the textarea (e.g., "Create a sorting function")
3. **Click "▶ Run"** button
4. **Wait ~1.5 seconds** for generation (simulated)
5. **See generated blocks** appear below with purple styling and connecting lines
6. **Edit generated content** freely - they're normal editable blocks
7. **Delete AI block** removes all connected generated blocks

### Deleting Blocks

- **Hover** over any block
- **Click "×"** in top-right corner
- Block is immediately removed
- **AI blocks**: Also removes all connected generated blocks

## 🎨 Styling Customization

The project uses CSS with custom properties for theming. Key style files:

- `TiptapEditor.css` - Main editor and all block styles
- `AIBlockReact.css` - AI block specific styles
- `BlockWithMenu.css` - Button positioning and styles
- `App.css` - Layout and page structure

### Color Scheme

- **Regular blocks**: Blue accent (#667eea)
- **AI blocks**: Purple/indigo (#764ba2, #667eea gradient)
- **Delete button**: Red (#ff4444)
- **Dark mode**: Adjusted for contrast

## 📦 Key Dependencies

```json
{
  "@tiptap/core": "^3.0.0",
  "@tiptap/react": "^3.0.0",
  "@tiptap/starter-kit": "^3.0.0",
  "@tiptap/pm": "^3.0.0",
  "@floating-ui/dom": "^1.6.0",
  "react": "^18.3.1",
  "vite": "^5.3.1"
}
```

## 🐛 Troubleshooting

### Issue: "BubbleMenu is not exported"
**Solution**: In Tiptap 3.0, import from `@tiptap/react/menus`:
```typescript
import { BubbleMenu } from '@tiptap/react/menus'
```

### Issue: "Please use NodeViewWrapper"
**Solution**: Ensure `NodeViewWrapper` is the outermost element in React NodeView components.

### Issue: Extensions using named exports
**Solution**: Most Tiptap 3.0 extensions use named exports:
```typescript
import { Underline } from '@tiptap/extension-underline'  // ✅
import Underline from '@tiptap/extension-underline'      // ❌
```

### Issue: Stale module cache
**Solution**: Clear Vite cache and restart:
```bash
rm -rf node_modules/.vite
npm run dev
```

## 🔧 Extending the Project

### Adding a New Block Type

1. Create a new extension file in `src/extensions/`
2. Define the node with `Node.create()`
3. Add React NodeView with `ReactNodeViewRenderer`
4. Register in `DocExtension` content schema
5. Add to `TiptapEditor.tsx` extensions array
6. Add insert command to `BlockInsertMenu.tsx`

Example:

```typescript
// src/extensions/ImageBlock.tsx
export const ImageBlock = Node.create({
  name: 'imageBlock',
  group: 'block',
  atom: true,
  
  addNodeView() {
    return ReactNodeViewRenderer(ImageBlockComponent)
  },
})
```

### Customizing AI Generation

Edit `AIBlockReact.tsx` > `handleRun()` function to:
- Call real AI APIs (OpenAI, Anthropic, etc.)
- Parse different response formats
- Generate specific block types based on prompts
- Add error handling and retry logic
- Stream responses in real-time

### Adding Block Metadata

Blocks support custom attributes:

```typescript
addAttributes() {
  return {
    customField: {
      default: null,
      parseHTML: el => el.getAttribute('data-custom'),
      renderHTML: attrs => ({ 'data-custom': attrs.customField }),
    },
  }
}
```

## 📚 Resources

### Tiptap 3.0
- [Tiptap Documentation](https://tiptap.dev)
- [Tiptap 3.0 Release Notes](https://tiptap.dev/blog/release-notes/tiptap-3-0-is-stable)
- [React Integration Guide](https://tiptap.dev/docs/editor/getting-started/install/react)
- [Custom Extensions Guide](https://tiptap.dev/docs/editor/extensions/custom-extensions)
- [React NodeViews](https://tiptap.dev/docs/editor/extensions/custom-extensions/node-views/react)

### ProseMirror
- [ProseMirror Documentation](https://prosemirror.net/)
- [ProseMirror Guide](https://prosemirror.net/docs/guide/)
- [Document Model](https://prosemirror.net/docs/guide/#doc)

### Related Tools
- [Floating UI](https://floating-ui.com/) - Menu positioning
- [Vite](https://vitejs.dev/) - Build tool
- [React](https://react.dev/) - UI framework

## 🤝 Contributing

This is a test/demo project. Feel free to:
- Experiment with new block types
- Improve the AI generation logic
- Add more formatting options
- Enhance the UI/UX
- Connect to real AI APIs

## 💡 Use Cases

This architecture is suitable for:
- **Notebook applications** (like Jupyter, Observable)
- **Documentation editors** with code snippets
- **AI-powered content tools**
- **Technical writing platforms**
- **Interactive tutorials**
- **Code playgrounds with explanations**
- **Knowledge base editors**
- **Research notebooks**

## 🎯 Key Learnings

This project demonstrates:
1. Building custom Tiptap 3.0 node extensions
2. Using React NodeViews for complex interactivity
3. Managing document schema constraints
4. Implementing cascading operations (delete AI + generated blocks)
5. Creating visual relationships between nodes
6. Working with ProseMirror transactions directly
7. Styling custom nodes with CSS
8. Integrating Floating UI for menus
9. Building Jupyter-style block interfaces
10. Managing node attributes for metadata tracking

## 📄 License

MIT - Feel free to use this code for learning or as a starting point for your own projects.

---

**Built with ❤️ using Tiptap 3.0, React, and TypeScript**
