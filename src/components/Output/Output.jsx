import React from 'react';
import './Output.css'

const Output = ({ output }) => {
    return (
        <div className='output-component'>

            <div className='output-header'>
                <span className='output-title'>Output </span>
            </div>


            <div className='output-container'>
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default Output;