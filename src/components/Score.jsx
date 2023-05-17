import Game from "./Game"
import React, { useState } from 'react';

export default function Score (props){
    const [returnToMenu, setReturn] = useState(false);
    const { index, score } = props;

    function reload(){
      setReturn(true)

    }

    return (
        <div>
            <h3>Ditt Resultat</h3>
            <p>{score}/{index}</p>
            <button onClick={reload}>Meny</button>
            {returnToMenu && <Game />}
        </div>
    )

}
