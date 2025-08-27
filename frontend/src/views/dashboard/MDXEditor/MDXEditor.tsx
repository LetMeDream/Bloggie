import '@mdxeditor/editor/style.css'
import { 
  MDXEditor, 
  UndoRedo, 
  BoldItalicUnderlineToggles, 
  toolbarPlugin, 
  BlockTypeSelect, 
  markdownShortcutPlugin, 
  thematicBreakPlugin,
  quotePlugin, 
  linkPlugin, 
  listsPlugin, 
  headingsPlugin,
  codeBlockPlugin, CodeBlockEditorDescriptor,
  AdmonitionDirectiveDescriptor, directivesPlugin, CreateLink, linkDialogPlugin
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useState, useRef } from 'react'

function AdmonitionDropdown({ editorRef }: { editorRef: React.RefObject<any> }) {
  const [open, setOpen] = useState(false)

  const insert = (type: string) => {
    editorRef.current?.insertMarkdown?.(`\n:::${type}\n\n:::\n`)
    setOpen(false)
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block', zIndex: 9999 }}>
      <button
        type="button"
        className="mdxeditor-toolbar-button"
        title="Insertar admonition"
        onClick={() => setOpen((v) => !v)}
      >
        Admonitions ▼
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            background: '#fff',
            border: '1px solid #ccc',
            minWidth: 120,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {['note', 'tip', 'info', 'caution', 'danger'].map((type) => (
            <button
              key={type}
              className="mdxeditor-toolbar-button hover:bg-primarys-hover"
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '4px 8px' }}
              onClick={() => insert(type)}
              type="button"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MDXEditory() {
  const [markdown, setMarkdown] = useState<string>('')
  const editorRef = useRef<any>(null)

  return (
    <MDXEditor
      ref={editorRef}
      onChange={setMarkdown}
      markdown={markdown}
      className=''
      spellCheck={false}
      plugins={[
        headingsPlugin(), listsPlugin(), linkPlugin(), quotePlugin(), thematicBreakPlugin(), linkDialogPlugin(),
        codeBlockPlugin(),
        directivesPlugin({ 
          directiveDescriptors: [AdmonitionDirectiveDescriptor] 
        }),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarClassName: 'MDX-toolbar',
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <CreateLink />
              <AdmonitionDropdown editorRef={editorRef} />

            </>
          )
        })
      ]}
    />
  )
}

export default MDXEditory