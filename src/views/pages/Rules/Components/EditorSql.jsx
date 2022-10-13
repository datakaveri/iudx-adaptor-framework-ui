import React from 'react';
import { PropTypes } from 'prop-types';
import AceEditor from 'react-ace';

import 'brace/mode/mysql';
import 'brace/theme/xcode';
import 'brace/snippets/mysql';
import 'brace/ext/language_tools';

const EditorSql = ({ value, setValue }) => {
  const onChange = newValue => {
    setValue(newValue.replace('table', 'TABLE'));
  };

  // const getAceAnnotations = () => {
  //   const { validationResult } = queryEditor;
  //   const resultIsReady = validationResult?.completed;
  //   if (resultIsReady && validationResult?.errors?.length) {
  //     const errors = validationResult.errors.map((err) => ({
  //       type: 'error',
  //       row: err.line_number - 1,
  //       column: err.start_column - 1,
  //       text: err.message,
  //     }));
  //     return errors;
  //   }
  //   return [];
  // };

  return (
    <AceEditor
      id="editor"
      aria-label="editor"
      mode="mysql"
      theme="xcode"
      name="editor"
      fontSize={18}
      minLines={15}
      maxLines={10}
      width="500px"
      height="300px"
      showPrintMargin={false}
      showGutter
      placeholder="Write your Query here..."
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
      value={value}
      onChange={onChange}
      showLineNumbers
      style={{
        marginBottom: '20px',
      }}
    />
  );
};

EditorSql.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default EditorSql;
