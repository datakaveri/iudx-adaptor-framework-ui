/* eslint-disable no-multi-str */
/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { PropTypes } from 'prop-types';

import AceEditor from 'react-ace';
import ace from "brace";

import 'brace/mode/json';
import 'brace/theme/xcode';
import 'brace/snippets/json';
import 'brace/ext/language_tools';


const snippet = '# AddNode\n\
snippet addn\n\
    {\n\
        "nodeName": "${1:node_name}",\n\
        "algorithmName": "${2:algo_name}",\n\
        "input": []\n\
    }\n\
';

ace.define("ace/snippets/json", ["require", "exports", "module"], (e, t) => {
  // eslint-disable-next-line
  (t.snippetText = snippet), (t.scope = "json");
});

const EditorJson = ({ value, setValue }) => {
  const onChange = newValue => {
    setValue(newValue);
  };

  return (
    <AceEditor
      id="editor"
      aria-label="editor"
      mode="json"
      theme="xcode"
      name="json-editor"
      fontSize={18}
      minLines={15}
      maxLines={10}
      width="500px"
      height="300px"
      showPrintMargin
      
      highlightActiveLine
      showGutter
      placeholder="Enter your input data..."
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        useWorker: true,
      }}
      value={value}
      onChange={onChange}
      style={{
        marginBottom: '20px',
      }}
    />
  );
};

EditorJson.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default EditorJson;
