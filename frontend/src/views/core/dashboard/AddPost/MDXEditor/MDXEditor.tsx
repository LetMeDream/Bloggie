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
  codeBlockPlugin, CodeBlockEditorDescriptor, Select,
  AdmonitionDirectiveDescriptor, directivesPlugin, CreateLink, linkDialogPlugin
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useState, useRef, useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { AddPostForm } from '../../../../../types/posts'

type MDXEditoryProps = {
  setValue: UseFormSetValue<AddPostForm>
}

function AdmonitionDropdown({ editorRef }: { editorRef: React.RefObject<any> }) {
  const [selected, setSelected] = useState('')

  const handleChange = (type: string) => {
    setSelected(type)
    if (type) {
      editorRef.current?.insertMarkdown?.(`\n:::${type}\n\n:::\n`)
    }
  }

  return (
    <Select
      value={selected}
      onChange={handleChange}
      triggerTitle="Admonitions"
      placeholder="Admonitions..."
      items={[
        { value: 'note', label: 'Note' },
        { value: 'tip', label: 'Tip' },
        { value: 'info', label: 'Info' },
        { value: 'caution', label: 'Caution' },
        { value: 'danger', label: 'Danger' }
      ]}
    />
  )
}

function MDXEditory({ setValue }: MDXEditoryProps) {
  const [markdown, setMarkdown] = useState<string>('')
  const normalEditorRef = useRef<any>(null)
  const previewEditorRef = useRef<any>(null)
  /* Logic for keeping preview and MDXEditor of the same size */
  const normalEditorWrapperRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: normalEditorWrapperRef.current?.clientWidth || 0,
        height: normalEditorWrapperRef.current?.clientHeight || 0
      })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <>
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-border">
        <input type="radio" name="my_tabs_2" className="tab bg-primarys" aria-label="Write" defaultChecked />
        <div className="tab-content" ref={normalEditorWrapperRef}>
          {/* Normal */}
          <MDXEditor
            ref={normalEditorRef}
            onChange={(value) => {
              // console.log(value)
              setMarkdown(value)
              setValue('description', value)
            }}
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
                    <AdmonitionDropdown editorRef={normalEditorRef} />

                  </>
                )
              })
            ]}
          />

        </div>

        <input type="radio" name="my_tabs_2" className="tab bg-primarys" aria-label="Markdownless " />
        <div className="tab-content">
          {/* Preview */}
          <textarea
            name='preview'
            style={{ width: size.width, height: size.height, resize: 'none' }}
            className='!border-primarys border rounded-lg pt-10 pl-4 text-gray-500 caret-transparent focus:outline-none'
            value={markdown}
            readOnly
          >
          </textarea>
          
        </div>

      </div>

    </>
  )
}

export default MDXEditory