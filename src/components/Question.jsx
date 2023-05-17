
import React, { useState } from 'react';
import Score from "./Score";


export default function Question(props) {
  const { questions, questionIndex, score, setScore, setCurrentQuestionIndex, selectedCategoryName } = props;
  const [finished, setFinished] = useState(false);


  /**
   * Function that handles the selected answer
   * If the answer is correct the score increases and an class will be appended
   * @param {Event} event - The onclick event that invokes the function
   * @param {*} isCorrect - The selected answer
   */
  function handleAnswerClick(event, isCorrect) {
    if (isCorrect) {
      setScore(score + 1);
      event.currentTarget.classList.add("correct-answer");
    } else {
      event.currentTarget.classList.add("incorrect-answer");
    };
  };


  /**
   * Function that set the score of the round
   * @param {Number} score - The score of the round
   * @param {String} selectedCategoryName - The name of the selected category
   */
  function setLocalStorage(score, selectedCategoryName) {
    const results = localStorage.getItem("Results");
    let resultsArr = [];
    if (results) {
      resultsArr = JSON.parse(results);
    }
    const newScore = {
      "Score": score,
      "Category": selectedCategoryName
    };
    resultsArr.push(newScore);
    localStorage.setItem("Results", JSON.stringify(resultsArr));
  };


  /**
   * Function that displays next question
   */
  function nextQuestion() {
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setLocalStorage(score, selectedCategoryName)
      setFinished(true);
    };
  };


  return (
    <div>
      {!finished &&
        <div> 
          <h2>Question no: {questionIndex + 1} / {questions.length}</h2>
          <h3>{questions[questionIndex]?.question}</h3>
          <ul>
            {questions[questionIndex]?.incorrect_answers && questions[questionIndex]?.correct_answer && [
              ...questions[questionIndex].incorrect_answers,
              questions[questionIndex].correct_answer
            ]
              .sort(() => Math.random() - 0.5)
              .map((answer) => (
                <li
                  key={answer}
                  onClick={(event) => handleAnswerClick(event, answer === questions[questionIndex]?.correct_answer)}
                >
                  {answer}
                </li>
              ))}
          </ul>
          <button onClick={nextQuestion}>{questionIndex === questions.length - 1 ? "Finish" : "Next Question"}</button>
          <div className='score'>
            <p>Score:</p>
            <p>{score}</p>
          </div>
        </div>
      }
      {finished && <Score index={questionIndex} score={score} />}
    </div>
  );
};
