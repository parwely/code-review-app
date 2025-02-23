import { useState } from "react";
import { Editor } from "@monaco-editor/react";

function CodeEditor({ onChange }) {
  const [code, setCode] = useState("// Schreibe deinen Code hier...");

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden w-full">
      <Editor
        height="400px"
        
        theme="vs-dark"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => {
          setCode(value);
          onChange(value);
        }}
      />
    </div>
  );
}

export default CodeEditor;

