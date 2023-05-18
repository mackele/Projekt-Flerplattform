
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
            <h3>Ditt resultat</h3>
            <p>{score}/{questionIndex + 1}</p>
            <button onClick={reload}>Meny</button>
        </div>
    );
};