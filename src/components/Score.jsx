
import React from 'react';


export default function Score (props){
    const { index, score } = props;

    function reload(){
        window.location.reload();
    };


    return (
        <div>
            <h3>Ditt Resultat</h3>
            <p>{score}/{index}</p>
            <button onClick={reload}>Meny</button>
        </div>
    );
};