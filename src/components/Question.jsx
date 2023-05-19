
import React, { useState, useEffect } from 'react';
import Score from "./Score";


export default function Question(props) {
  const { questions, questionIndex, score, setScore, setCurrentQuestionIndex, selectedCategoryName, difficulty } = props;
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  let i = 0;


  /**
   * Function that randomize and set the order of the alternatives for a question in order to prevent the same 'alternative' to be correct each time
   */
  useEffect(function shuffleQuestions() {
    if (questions[questionIndex]) {
      const shuffledQuestions = [...questions[questionIndex].incorrect_answers, questions[questionIndex].correct_answer].sort(() => Math.random() - 0.5);
      const correct_answer = questions[questionIndex].correct_answer;
      setCorrectAnswer(correct_answer);
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
          const answerElements = event.currentTarget.parentNode.children;
          for (let i = 0; i < answerElements.length; i++) {
            if (answerElements[i].textContent === correctAnswer) {
              answerElements[i].classList.add("theAnswer");
            };
        };
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
        <div className='question'> 
          <h1>{selectedCategoryName.toUpperCase()}</h1>
          <h3>Question no: {questionIndex + 1} / {questions.length}</h3>
          <h2>{questions[questionIndex]?.question}</h2>
          <div id='answers'>
            {shuffledQuestions.map((answer) => (
              <div className= {"answer" + (i += 1)}
                key={answer}
                onClick={(event) => handleAnswerClick(event, answer === questions[questionIndex]?.correct_answer)}
              >
                {answer}
              </div>
            ))}
           </div> 
           <div className='score'>
            <p>Score: </p>
            <p>{score}</p>
          </div>
          <button onClick={nextQuestion}>{questionIndex === questions.length - 1 ? "FINISH" : "NEXT QUESTION"}</button>
        </div>
      }

      {/* Display the score when the round is finished */}
      {finished && <Score questionIndex={questionIndex} score={score} />}
    </div>
  );
};
