import type { Editor } from '@tiptap/vue-3';

export const useBold = (editor: Editor | undefined) => {
  return editor?.commands.toggleBold();
};

export const useItalic = (editor: Editor | undefined) => {
  return editor?.commands.toggleItalic();
};

export const useStrike = (editor: Editor | undefined) => {
  return editor?.commands.toggleStrike();
};

export const useHorizontalRule = (editor: Editor | undefined) => {
  return editor?.commands.setHorizontalRule();
};

export const useCode = (editor: Editor | undefined) => {
  return editor?.commands.toggleCode();
};

export const useCodeBlock = (editor: Editor | undefined) => {
  return editor?.commands.toggleCodeBlock();
};

export const useBlockQuote = (editor: Editor | undefined) => {
  return editor?.commands.toggleBlockquote();
};

export const useHistory = (
  editor: Editor | undefined,
  type: 'undo' | 'redo',
) => {
  if (type === 'undo') {
    return editor?.commands.undo();
  } else {
    return editor?.commands.redo();
  }
};

export const useEditorFocus = (editor: Editor | undefined) => {
  return editor?.commands.focus();
};
