import React from 'react'
import Score from "./Score"


export default function Question(props) {
  let {questions, questionIndex, score, setScore, setCurrentQuestionIndex, selectedCategoryName} = props;

  function handleAnswerClick (event, isCorrect) {
    
    if (isCorrect) {
      setScore(score + 1);
      event.currentTarget.classList.add("correct-answer");
    } else {
      event.currentTarget.classList.add("incorrect-answer");
    };
  };


  function nextQuestion () {
    let nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
        const results = localStorage.getItem("Results");
        let resultsArr = [];
        if (results) {
            resultsArr = JSON.parse(results);
        };
        let newScore = {
            "Score": score,
            "Category": selectedCategoryName
        };
        resultsArr.push(newScore);

      localStorage.setItem("Results", JSON.stringify(resultsArr));
    };
    console.log(questionIndex +1)
    console.log(questions.length)
  };


  return (
    <div>Question component
      {/* Visar upp den fråga man är på */}
      <h2>Question no: {questionIndex + 1} / {questions.length}</h2>
      {/* Visar upp själva frågan */}
      <h3>{questions[questionIndex].question}</h3>
      <ul>
      {[...questions[questionIndex].incorrect_answers, questions[questionIndex].correct_answer]
        .sort(() => Math.random() - 0.5)
        .map((answer) => (
          <li
            key={answer}
            onClick={(event) => handleAnswerClick(event, answer === questions[questionIndex].correct_answer)}
          >
            {answer}
          </li>
        ))}
      </ul>
      <button onClick={nextQuestion}>Nästa fråga</button>
      <div className='score'>
        <p>Score:</p>
        <p>{score}</p>
      </div>
      {questions.length +1 === questionIndex +2  && (
        <Score index={questionIndex} score={score}/>
      )}
    </div>
  );
};