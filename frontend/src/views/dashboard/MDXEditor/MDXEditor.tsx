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
import { useState, useRef } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { AddPostForm } from '../../../types/posts'

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
  const editorRef = useRef<any>(null)

  return (
    <MDXEditor
      ref={editorRef}
      onChange={(value) => {
        console.log(value)
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
              <AdmonitionDropdown editorRef={editorRef} />

            </>
          )
        })
      ]}
    />
  )
}

export default MDXEditory