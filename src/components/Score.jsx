
import React from 'react';


export default function Score (props){
    const { questionIndex, score } = props;


    /**
     * Function that reloads page
     */
    function reload(){
        window.location.reload();
    };

    return (
        <div id='score'>
            <h1>Your Score</h1>
            <h2>{score}/{questionIndex + 1}</h2>
            <button onClick={reload}>Menu</button>
        </div>
    );
};