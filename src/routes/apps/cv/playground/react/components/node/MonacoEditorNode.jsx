import React, { memo } from 'react';
import { createRoot } from "react-dom/client";
import { Handle, Position } from 'reactflow';
import MonacoEditor, { MonacoDiffEditor } from "react-monaco-editor";

class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "// type your code... \n",
      theme: "vs-light",
    };
  }

  onChange = (newValue) => {
    console.log("onChange", newValue); // eslint-disable-line no-console
  };

  editorDidMount = (editor) => {
    // eslint-disable-next-line no-console
    console.log("editorDidMount", editor, editor.getValue(), editor.getModel());
    this.editor = editor;
  };

  changeEditorValue = () => {
    if (this.editor) {
      this.editor.setValue("// code changed! \n");
    }
  };

  changeBySetState = () => {
    this.setState({ code: "// code changed by setState! \n" });
  };

  setDarkTheme = () => {
    this.setState({ theme: "vs-dark" });
  };

  setLightTheme = () => {
    this.setState({ theme: "vs-light" });
  };

  render() {
    const { code, theme } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: "line",
      automaticLayout: false,
    };
    return (
      <div>
        <div>
          <button onClick={this.changeEditorValue} type="button">
            Change value
          </button>
          <button onClick={this.changeBySetState} type="button">
            Change by setState
          </button>
          <button onClick={this.setDarkTheme} type="button">
            Set dark theme
          </button>
          <button onClick={this.setLightTheme} type="button">
            Set light theme
          </button>
        </div>
        <hr />
        <MonacoEditor
          height="400"
          language="javascript"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
          theme={theme}
        />
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
      </div>
    );
  }
}

export default memo(CodeEditor);