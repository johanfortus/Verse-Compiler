import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import verseParser from './verse-parser';

function App() {
    const [code, setCode] = useState('// Write your Verse code here');
    const [output, setOutput] = useState('');

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const runCode = () => {
        try {
            const result = verseParser.parse(code);
            setOutput(JSON.stringify(result, null, 2));
        }
        catch(e){
            setOutput(`Parse error: ${e.message}`);
        }
        // setOutput(`Code ${code}`)
    }

    return (
        <div>
            <h1>Verse Playground</h1>

            
            <div style={{ display: 'flex' }}>


                {/* Code Editor Container */}    
                <div style={{ display:'flex', flexDirection:'column', width:'50%', padding:'10px'}}>
                    <h2 style={{ margin:"0" }} >&lt;/&gt; Code: </h2>
                    <Editor
                        height="500px"
                        defaultLanguage="javascript"
                        value={code}
                        onChange={handleEditorChange}
                        theme="vs-dark"
                    />
                </div>
                
                
                {/* Output Area Container */}
                <div style={{ display:"flex", flexDirection: "column", width: '50%', padding:'10px'}}>
                    <h2 style={{ margin:"0" }}>Output: </h2>
                    <div style={{ border: '1px solid #ddd', height: '500px', overflowY: 'scroll', backgroundColor: '#f9f9f9'}}>
                        <pre>{output}</pre>
                    </div>
                </div>

            </div>
            <button style={{ marginLeft: '10px' }} onClick={runCode}>Run Code</button>
        </div>
    );

}

export default App;
