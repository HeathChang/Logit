"use client";

import { useState } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { $getRoot } from "lexical";
import type { InitialConfigType } from "@lexical/react/LexicalComposer";

import { useEditor } from "@/features/dashboard/model/useEditor";

export interface LogEditorProps {
  initialConfig: InitialConfigType;
  title: string;
  onChangeTitle: (value: string) => void;
  onSave: () => void;
  isSaveEnabled: boolean;
  onChangeContent: (value: string) => void;
}

const logEditorTheme = {
  paragraph: "mb-1 leading-relaxed text-sm text-text-main",
  text: {
    bold: "font-semibold",
    italic: "italic",
    underline: "underline",
  },
};

const ContentChangePlugin = ({
  onChange,
}: {
  onChange: (text: string) => void;
}) => {
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

export const LogEditorView = ({
  initialConfig,
  title,
  onChangeTitle,
  onSave,
  isSaveEnabled,
  onChangeContent,
}: LogEditorProps) => {
  return (
    <section className="h-full w-full">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl border border-border-main bg-bg-card px-4 py-2 shadow-sm">
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold tracking-tight text-text-main">
              오늘의 로그
            </h2>
            <p className="text-[11px] text-text-sub">
              오늘 했던 일, 느낀 점, 내일의 할 일을 가볍게 적어 보세요.
            </p>
          </div>
        </div>

        {/* 제목 입력 필드 */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="log-title"
            className="text-xs font-medium text-text-main"
          >
            제목 <span className="text-status-danger">*</span>
          </label>
          <input
            id="log-title"
            type="text"
            value={title}
            onChange={(event) => onChangeTitle(event.target.value)}
            placeholder="오늘의 로그 제목을 입력하세요"
            className="rounded-lg border border-border-main bg-bg-main px-3 py-2 text-sm text-text-main outline-none focus:border-logit-log"
          />
        </div>

        <LexicalComposer initialConfig={initialConfig}>
          <div className="relative flex h-full min-h-[260px] flex-col rounded-xl border border-border-main bg-bg-main px-3 py-2">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="h-full min-h-[200px] w-full flex-1 resize-none bg-transparent pb-1 pt-2 text-sm leading-relaxed text-text-main outline-none" />
              }
              placeholder={
                <div className="pointer-events-none absolute left-4 top-3 text-sm text-text-sub">
                  오늘 하루를 기록해 보세요...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ContentChangePlugin onChange={onChangeContent} />

            <div className="mt-2 flex items-center justify-between border-t border-dashed border-border-main pt-2 text-[10px] text-text-sub">
              <span>Shift + Enter 로 줄바꿈</span>
              <button
                type="button"
                onClick={onSave}
                disabled={!isSaveEnabled}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  isSaveEnabled
                    ? "cursor-pointer bg-status-success text-white hover:opacity-90"
                    : "cursor-not-allowed bg-bg-main text-text-sub opacity-50"
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

export const LogEditorContainer = () => {
  const { initialConfig } = useEditor({
    theme: logEditorTheme,
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isSaveEnabled =
    title.trim().length > 0 && content.trim().length >= 10;

  const handleSave = () => {
    if (!isSaveEnabled) return;
    // TODO: 저장 로직 구현
    // eslint-disable-next-line no-console
    console.log("저장:", { title, content });
  };

  return (
    <LogEditorView
      initialConfig={initialConfig}
      title={title}
      onChangeTitle={setTitle}
      onSave={handleSave}
      isSaveEnabled={isSaveEnabled}
      onChangeContent={setContent}
    />
  );
};

