import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode, handleEditorMount }) => {

    const handleEditorChange = (value) => {
		setCode(value);
	};


    return (  
            <Editor
                height="80%"
                defaultLanguage="verse"
                language='verse'
                theme="verse-dark"
                value={code}
                onChange={handleEditorChange}
                onMount={handleEditorMount}
                options={{
                    fontSize: 14,
                    autoClosingBrackets: 'always',
                }}
            />
    );
};

export default CodeEditor;