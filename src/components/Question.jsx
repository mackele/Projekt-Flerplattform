
import React, { useState, useEffect } from 'react';
import Score from "./Score";


export default function Question(props) {
  const { questions, questionIndex, score, setScore, setCurrentQuestionIndex, selectedCategoryName } = props;
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);


  useEffect(function shuffleQuestions() {
    if (questions[questionIndex]) {
      const shuffledQuestions = [...questions[questionIndex].incorrect_answers, questions[questionIndex].correct_answer].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffledQuestions);
    };
  }, [questions, questionIndex]);


  /**
   * Function that handles the selected answer
   * If the answer is correct the score increases and an class will be appended
   * @param {Event} event - The onclick event that invokes the function
   * @param {*} isCorrect - The selected answer
   */
  function handleAnswerClick(event, isCorrect) {
    if (selectedAnswer === null){
        if (isCorrect) {
          setScore(score + 1);
          event.currentTarget.classList.add("correct-answer");
        } else {
          event.currentTarget.classList.add("incorrect-answer");
        };
        setSelectedAnswer(event.currentTarget);
      }
    }
    


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
      setSelectedAnswer(null); 
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
            {shuffledQuestions.map((answer) => (
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
