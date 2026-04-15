"use client";

import { useState } from "react";
import { useEditor } from "@/features/dashboard/model/useEditor";
import { LogEditor } from "./LogEditor.ui";

const logEditorTheme = {
  paragraph: "mb-1 leading-relaxed text-sm text-text-main",
  text: {
    bold: "font-semibold",
    italic: "italic",
    underline: "underline",
  },
};

export const LogEditorContainer = () => {
  const { initialConfig } = useEditor({
    theme: logEditorTheme,
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isSaveEnabled = title.trim().length > 0 && content.trim().length >= 10;

  const handleSave = () => {
    if (!isSaveEnabled) return;
    // TODO: 저장 로직 구현
  };

  return (
    <LogEditor
      initialConfig={initialConfig}
      title={title}
      onChangeTitle={setTitle}
      onSave={handleSave}
      isSaveEnabled={isSaveEnabled}
      onChangeContent={setContent}
    />
  );
};
