import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

function App() {
    const [code, setCode] = useState('// Write your Verse code here');

    const handleEditorChange = (value) => {
        setCode(value);
    };

    return (
        <div>
            <h1>Verse Playground</h1>
            <Editor
                height="90vh"
                defaultLanguage="javascript"
                value={code}
                onChange={handleEditorChange}
                theme="vs-dark"
            />
        </div>
    );
}

export default App;
