import { Editor } from '@tiptap/react';

type props = {
  handleClick: Function;
  editor: Editor;
  isBubble?: boolean;
};

export default function MarkupEditorBar(props: props) {
  return (
    <div
      className={`markup-editor__bar ${
        props.isBubble ? ' markup-editor__bar--bubble' : ''
      }`}
    >
      <button
        className={props.editor?.isActive('bold') ? 'active' : 'notActive'}
        onClick={(e) =>
          props.handleClick(e, props.editor.chain().focus().toggleBold().run)
        }
      >
        Bold
      </button>
      <button
        className={props.editor?.isActive('italic') ? 'active' : 'notActive'}
        onClick={(e) =>
          props.handleClick(e, props.editor.chain().focus().toggleItalic().run)
        }
      >
        italic
      </button>
      <button
        className={props.editor?.isActive('bulletList') ? 'notActive' : ''}
        onClick={(e) =>
          props.handleClick(
            e,
            props.editor.chain().focus().toggleBulletList().run
          )
        }
      >
        bullet list
      </button>
      <button
        onClick={(e) =>
          props.handleClick(
            e,
            props.editor.chain().focus().toggleOrderedList().run
          )
        }
        className={props.editor?.isActive('orderedList') ? 'notActive' : ''}
      >
        toggleOrderedList
      </button>
      <button
        onClick={(e) =>
          props.handleClick(
            e,
            props.editor.chain().focus().splitListItem('listItem').run
          )
        }
        disabled={!props.editor?.can().splitListItem('listItem')}
      >
        splitListItem
      </button>
      <button
        onClick={(e) =>
          props.handleClick(
            e,
            props.editor.chain().focus().sinkListItem('listItem').run
          )
        }
        disabled={!props.editor?.can().sinkListItem('listItem')}
      >
        sinkListItem
      </button>
      <button
        onClick={(e) =>
          props.handleClick(
            e,
            props.editor.chain().focus().liftListItem('listItem').run
          )
        }
        disabled={!props.editor?.can().liftListItem('listItem')}
      >
        liftListItem
      </button>

      <button
        className={props.editor?.isActive('codeBlock') ? 'active' : 'notActive'}
        onClick={(e) =>
          props.handleClick(
            e,
            props.editor.chain().focus().toggleCodeBlock().run
          )
        }
      >
        code
      </button>
    </div>
  );
}
