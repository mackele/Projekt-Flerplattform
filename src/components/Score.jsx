export default function Score (props){
    const { index, score } = props;

    return (
        <div>
            <h3>Ditt Resultat</h3>
            <p>{score}/{index}</p>
        </div>
    )

}
