import React, { useState } from 'react';
import Header from '../Header/Header.jsx';
import Editor from '../Editor/Editor.jsx';
import Output from '../Output/Output.jsx';
import { defaultCode } from '../../utils/defaultCode.js';
import { parse } from '../../utils/parser.js';
import { VerseInterpreter } from '../../utils/interpreter.js';
import { registerVerseLanguage } from '../../language/verse-language.js';

function App() {
	const [code, setCode] = useState(defaultCode);
	const [output, setOutput] = useState('');
	const [astOutput, setAstOutput] = useState('');
	const interpreter = new VerseInterpreter();

	const handleEditorMount = (editor, monaco) => {
		console.log('monaco is ready');
		registerVerseLanguage(monaco);
		monaco.editor.setTheme('verse-dark');
	};

	const runCode = () => {
		try {
			console.log("Raw Input Code:", code);
			const ast = parse(code);
			console.log('Parsed AST:', ast);
			setAstOutput(JSON.stringify(ast, null, 2));

			const result = interpreter.interpret(ast);
			setOutput(result);
		}
		catch (e) {
			setOutput(`Parse error: ${e.message}`);
		}
	};

	return (
		<>
			<Header />

			<div style={{ display: 'flex', backgroundColor: 'lightgray', height: '100vh' }}>
				<Editor code={code} setCode={setCode} handleEditorMount={handleEditorMount} runCode={runCode} />
				<Output output={output} />
			</div>
		</>
	);
};

export default App;
