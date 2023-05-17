
import React from 'react'


export default function Question(props) {
  const {questions, questionIndex, score, setScore, setCurrentQuestionIndex, selectedCategoryName} = props;

  const handleAnswerClick = (event, isCorrect) => {
    const target = event.currentTarget;
    if (isCorrect) {
      setScore(score + 1);
      target.classList.add("correct-answer");
    } else {
      target.classList.add("incorrect-answer");
    };
  };


  const nextQuestion = () => {
    const nextQuestionIndex = questionIndex + 1;
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
    </div>
  );
};