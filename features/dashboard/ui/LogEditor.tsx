'use client';
import { useState } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
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

// Lexical 에디터의 텍스트 내용을 추출하는 플러그인
const ContentChangePlugin = ({
    onChange,
}: {
    onChange: (text: string) => void;
}) => {
    const [editor] = useLexicalComposerContext();

    return (
        <OnChangePlugin
            onChange={(editorState) => {
                editorState.read(() => {
                    const root = $getRoot();
                    const text = root.getTextContent();
                    onChange(text);
                });
            }}
        />
    );
};

const LogEditor = () => {
    const { initialConfig } = useEditor({
        theme: logEditorTheme,
    });

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 제목이 있고, 내용이 10글자 이상일 때만 버튼 활성화
    const isSaveEnabled = title.trim().length > 0 && content.trim().length >= 10;

    const handleSave = () => {
        if (!isSaveEnabled) return;
        // TODO: 저장 로직 구현
        console.log("저장:", { title, content });
    };

    return (
        <section className="w-full h-full">
            <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-card)] py-2 px-4 shadow-sm">
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

                {/* 제목 입력 필드 */}
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="log-title"
                        className="text-xs font-medium text-[var(--color-text-main)]"
                    >
                        제목 <span className="text-[var(--color-status-danger)]">*</span>
                    </label>
                    <input
                        id="log-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="오늘의 로그 제목을 입력하세요"
                        className="rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-main)] px-3 py-2 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-logit-log)]"
                    />
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
                        <ContentChangePlugin onChange={setContent} />

                        <div className="mt-2 flex items-center justify-between border-t border-dashed border-[var(--color-border-main)] pt-2 text-[10px] text-[var(--color-text-sub)]">
                            <span>Shift + Enter 로 줄바꿈</span>
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={!isSaveEnabled}
                                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                                    isSaveEnabled
                                        ? "bg-[var(--color-status-success)] text-white hover:opacity-90 cursor-pointer"
                                        : "bg-[var(--color-bg-main)] text-[var(--color-text-sub)] cursor-not-allowed opacity-50"
                                }`}
                            >
                                저장
                            </button>
                        </div>
                    </div>
                </LexicalComposer>
            </div>
        </section>
    );
};

export default LogEditor;