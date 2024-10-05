import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

function App() {
    const [code, setCode] = useState('// Write your Verse code here');
    const [output, setOutput] = useState('');

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const runCode = () => {
        console.log("Running: ", code);
        setOutput(`Code ${code}`)
    }

    return (
        <div>
            <h1>Verse Playground</h1>
            <Editor
                height="500px"
                width="800px"
                defaultLanguage="javascript"
                value={code}
                onChange={handleEditorChange}
                theme="vs-dark"
            />
            <button onClick={runCode}>Run Code</button>

            <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '10px', width: '800px', height: '200px', overflowY: 'scroll', backgroundColor: '#f9f9f9'}}>
                <h2>Output:</h2>
                <pre>{output}</pre>

            </div>

        </div>
    );

}

export default App;
