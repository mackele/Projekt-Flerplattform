
import React from 'react';


export default function Score (props){
    const { index, score } = props;


    /**
     * Function that reloads page
     */
    function reload(){
        window.location.reload();
    };

    return (
        <div>
            <h3>Ditt resultat</h3>
            <p>{score}/{index + 1}</p>
            <button onClick={reload}>Meny</button>
        </div>
    );
};