'use client';
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useEditor } from "@/features/dashboard/model/useEditor";


const logEditorTheme = {
    paragraph:
        "mb-1 leading-relaxed text-sm text-[var(--color-text-main)] ",
    text: {
        bold: "font-semibold",
        italic: "italic",
        underline: "underline",
    },
};


const LogEditor = () => {
    const { initialConfig } = useEditor({
        theme: logEditorTheme,
    });

    return (
        <section className="w-full h-full">
            <div className="mx-auto flex h-full max-w-5xl flex-col gap-3 rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-card)] p-4 shadow-sm">
                <div className="flex items-baseline justify-between gap-2">
                    <div className="flex flex-col">
                        <h2 className="text-sm font-semibold tracking-tight text-[var(--color-text-main)]">
                            오늘의 로그
                        </h2>
                        <p className="text-[11px] text-[var(--color-text-sub)]">
                            오늘 했던 일, 느낀 점, 내일의 할 일을 가볍게 적어 보세요.
                        </p>
                    </div>
                </div>

                <LexicalComposer initialConfig={initialConfig}>
                    <div className="relative flex h-full min-h-[260px] flex-col rounded-xl border border-[var(--color-border-main)] bg-[var(--color-bg-main)] px-3 py-2">
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable
                                    className="h-full min-h-[200px] w-full flex-1 resize-none bg-transparent pb-1 pt-2 text-sm leading-relaxed text-[var(--color-text-main)] outline-none"
                                />
                            }
                            placeholder={
                                <div className="pointer-events-none absolute left-4 top-3 text-sm text-[var(--color-text-sub)]">
                                    오늘 하루를 기록해 보세요...
                                </div>
                            }
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <HistoryPlugin />
                        <AutoFocusPlugin />

                        <div className="mt-2 flex items-center justify-between border-t border-dashed border-[var(--color-border-main)] pt-2 text-[10px] text-[var(--color-text-sub)]">
                            <span>Shift + Enter 로 줄바꿈</span>
                            <button
                                type="button"
                                className="rounded-full bg-[var(--bg-default)] px-2 py-1 text-[10px] text-[var(--color-text-sub)]"
                            >
                                Hello
                            </button>
                        </div>
                    </div>
                </LexicalComposer>
            </div>
        </section>
    );
};

export default LogEditor;