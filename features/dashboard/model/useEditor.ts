
// Point to Think: Theme 과 

interface UseEditorProps {
    theme: object;
}

export const useEditor = ({ theme }: UseEditorProps) => {


    const onError = (error: Error) => {
        console.error(error);
    }





    const initialConfig = {
        namespace: "logit-log-editor",
        theme,
        onError,
    };

    return {
        initialConfig,
    }
};