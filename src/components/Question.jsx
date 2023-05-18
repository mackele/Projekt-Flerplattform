
import React, { useState, useEffect } from 'react';
import Score from "./Score";


export default function Question(props) {
  const { questions, questionIndex, score, setScore, setCurrentQuestionIndex, selectedCategoryName, difficulty } = props;
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);


  /**
   * Function that randomize and set the order of the alternatives for a question in order to prevent the same 'alternative' to be correct each time
   */
  useEffect(function shuffleQuestions() {
    if (questions[questionIndex]) {
      const shuffledQuestions = [...questions[questionIndex].incorrect_answers, questions[questionIndex].correct_answer].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffledQuestions);
    };
  }, [questions, questionIndex]);


  /**
   * Function that handles the selected answer
   * If the answer is correct the score increases and an class will be appended to the right and selected answer
   * @param {Event} event - The onclick event that invokes the function
   * @param {Boolean} isCorrect - The selected answer
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
      };
    };
  

  /**
   * Function that set the score of the round
   * @param {Number} score - The score of the round
   * @param {String} selectedCategoryName - The name of the selected category
   */
  function setLocalStorage(score, selectedCategoryName, numberOfQuestions) {
    const results = localStorage.getItem("Results");
    let resultsArr = [];

    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    const timstamp = (year + "-" + month + "-" + day);
    
    if (results) {
      resultsArr = JSON.parse(results);
    }
    const newScore = {
      "Score": score,
      "Category": selectedCategoryName,
      "NumberOfQuestions": numberOfQuestions,
      "TimeStamp": timstamp,
      "Difficulty":difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
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
      setLocalStorage(score, selectedCategoryName, questions.length)
      setFinished(true);
    };
  };

  
  return (
    <div>

      {/* Display the questions if the game is not finished */}
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

      {/* Display the score when the round is finished */}
      {finished && <Score questionIndex={questionIndex} score={score} />}
    </div>
  );
};
