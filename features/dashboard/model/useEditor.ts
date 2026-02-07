import type { InitialConfigType } from "@lexical/react/LexicalComposer";

interface UseEditorProps {
  theme: InitialConfigType["theme"];
}

export const useEditor = ({ theme }: UseEditorProps) => {
  const onError = (error: Error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  };

  const initialConfig: InitialConfigType = {
    namespace: "logit-log-editor",
    theme,
    onError,
  };

  return {
    initialConfig,
  };
};
