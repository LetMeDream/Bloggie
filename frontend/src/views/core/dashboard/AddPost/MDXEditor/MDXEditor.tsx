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
  codeBlockPlugin, Select, ConditionalContents, InsertCodeBlock, ChangeCodeMirrorLanguage, ShowSandpackInfo, InsertSandpack,
  sandpackPlugin,
  AdmonitionDirectiveDescriptor, directivesPlugin, CreateLink, linkDialogPlugin,
  useCodeBlockEditorContext, codeMirrorPlugin,
} from '@mdxeditor/editor'
import { CodeBlockEditorDescriptor } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useState, useRef, useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { AddPostForm } from '../../../../../types/posts'
import { SandpackConfig } from '@mdxeditor/editor'
import './MDXEditorStyles.css'

type MDXEditoryProps = {
  setValue?: UseFormSetValue<AddPostForm>,
  defaultValue?: string,
  name?: Parameters<UseFormSetValue<AddPostForm>>[0],
  mode?: 'normal' | 'preview'
}

/* Dropdrown */
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

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent
    }
  ]
}


const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
  // always use the editor, no matter the language or the meta of the code block
  match: (language = 'js', meta = 'en') => true,
  // You can have multiple editors with different priorities, so that there's a "catch-all" editor (with the lowest priority)
  priority: 0,
  // The Editor is a React component
  Editor: (props) => {
    const cb = useCodeBlockEditorContext()
    // stops the propagation so that the parent lexical editor does not handle certain events.
    return (
      <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <textarea rows={3} cols={20} defaultValue={props.code} onChange={(e) => cb.setCode(e.target.value)} />
      </div>
    )
  }
}


function MDXEditory({ setValue, defaultValue, name, mode = 'normal' }: MDXEditoryProps) {
  const [markdown, setMarkdown] = useState<string>('')
  const normalEditorRef = useRef<any>(null)
  const previewEditorRef = useRef<any>(null)
  /* Logic for keeping preview and MDXEditor of the same size */
  const normalEditorWrapperRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  /* set value for the MDXEditor, if any */
  useEffect(() => {
    setTimeout(() => {
      if (defaultValue) {
        normalEditorRef.current?.setMarkdown?.(defaultValue as string || '')
        setMarkdown(defaultValue as string || '')
        if (setValue && name) {
          setValue(name, defaultValue as string || '')
        }
      }
    }, 200);
  }, [defaultValue])

  /* This useEffect updates the size of the preview, with the value of the 'normal' editor */
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

  if (mode === 'normal') {
    return (
      <>
        {/* name of each tab group should be unique */}
        <div className='tabs tabs-border'>
          <input type="radio" name="my_tabs_2" className="tab bg-primarys" aria-label="Write" defaultChecked />
          <div className="tab-content" ref={normalEditorWrapperRef}>
            {/* Normal */}
            <MDXEditor
              ref={normalEditorRef}
              onChange={(value) => {
                // console.log(value)
                setMarkdown(value)
                if (setValue && name){
                  setValue(name, value)
                }
              }}
              markdown={markdown}
              className=''
              spellCheck={false}
              plugins={[
                
                headingsPlugin(), listsPlugin(), linkPlugin(), quotePlugin(), thematicBreakPlugin(), linkDialogPlugin(),
                /* codeBlockPlugin({ codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor] }),
                codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }), */
                codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
                codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
                directivesPlugin({ 
                  directiveDescriptors: [AdmonitionDirectiveDescriptor] 
                }),
                markdownShortcutPlugin(),
                toolbarPlugin({
                  toolbarClassName: 'MDX-toolbar',
                  toolbarContents: () => (
                    <>
                      <ConditionalContents
                        options={[
                          { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                          { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                          {
                            fallback: () => (
                              <>
                                <InsertCodeBlock />
                                <InsertSandpack />
                              </>
                            )
                          }
                        ]}
                      />
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
  if (mode === 'preview') {
     return (
      <>
        {/* name of each tab group should be unique */}

            {/* Normal */}
            <MDXEditor

              ref={normalEditorRef}
              onChange={(value) => {
                // console.log(value)
                setMarkdown(value)
                if (setValue && name){
                  setValue(name, value)
                }
              }}
              markdown={markdown}
              spellCheck={false}
              plugins={[
                headingsPlugin(), listsPlugin(), linkPlugin(), quotePlugin(), thematicBreakPlugin(), linkDialogPlugin(),
                codeBlockPlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
                codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
                directivesPlugin({ 
                  directiveDescriptors: [AdmonitionDirectiveDescriptor] 
                }),
                markdownShortcutPlugin(),
                
              ]}
              
              className='!bg-transparent !px-8 pt-4 !border-secondary'

            />
      </>
    )
  }
}

export default MDXEditory