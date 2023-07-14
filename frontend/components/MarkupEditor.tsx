'use client';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import MarkupEditorBar from './MarkupEditorBar';
type Props = {
  handleInput: Function;
  className: string;
  content?: string;
};

export default function MarkupEditor(props: Props) {
  const [bubbleNode, setBubbleNode] = useState(null);

  const [content, setContent] = useState(props.content || '');
  const editor = useEditor({
    extensions: [StarterKit],
    autofocus: true,
    editable: true,
    injectCSS: true,
  });

  if (props?.content?.length > 0 && content?.length === 0) {
    editor?.commands?.setContent(props.content);
    setContent(props.content);
  }
  useEffect(() => {
    setBubbleNode(document.querySelector('.markup-editor__bar--bubble'));
    setTimeout(() => {
      console.log(document.querySelector('.markup-editor__bar--bubble'));
    }, 10);
  }, [bubbleNode]);

  function setMarkdown(e: MouseEvent, fn: Function) {
    e.preventDefault();
    fn();
    setTimeout(() => {
      props.handleInput(editor.getHTML());
    }, 2);
  }
  return (
    <div className='markup-editor'>
      <MarkupEditorBar
        handleClick={(e, fn) => setMarkdown(e, fn)}
        editor={editor}
      />
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <MarkupEditorBar
            isBubble={true}
            handleClick={(e, fn) => setMarkdown(e, fn)}
            editor={editor}
          />
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        className={props.className}
        onInput={() => props.handleInput(editor.getHTML())}
      />
    </div>
  );
}
