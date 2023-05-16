
import React, { useState, useEffect } from 'react';
import { fetchQuestionsByCategory, fetchCategories } from '../utils/trivia';


export default function Game() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [numQuestions, setNumQuestions] = useState(1); // Initial state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [results, setResults] = useState([]);


  useEffect(() => {
    const fetchCategoriesData = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    fetchCategoriesData();
  }, []);


  const handleCategoryChange = (e) => {
    const selectedCategoryID = (e.target.value);
    setSelectedCategory(selectedCategoryID);
    const selectedCategoryName = categories.find((category) => Number(category.id) === Number(selectedCategoryID));
    setSelectedCategoryName(selectedCategoryName ? selectedCategoryName.name : null);
  };


  const handleNumQuestionsChange = (e) => {
    setNumQuestions(Number(e.target.value));
  };


  const handleStartQuiz = async () => {
    const quizQuestions = await fetchQuestionsByCategory(numQuestions, selectedCategory);
    setQuestions(quizQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  };


  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
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
      setShowScore(true);
    };
  };


  useEffect(() => {
    const fetchResultsData = () => {
      const resultsData = localStorage.getItem('Results');
      if (resultsData) {
        setResults(JSON.parse(resultsData));
      }
    };
    fetchResultsData();
  }, []);


  
  return (
    <div className="App">
      <h1>React Question Game</h1>
      {!questions.length && (
        <div>
          <h2>Select Category and Number of Questions to Start Quiz</h2>
          <label>
            Category:
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Number of Questions:
            <input type="number" min="1" max="50" value={numQuestions} onChange={handleNumQuestionsChange} />
          </label>
          <br />
          <button disabled={!selectedCategory} onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      )}
      {showScore && (
        <div>
          <h2>Your Score: {score}/{questions.length}</h2>
          <button onClick={() => window.location.reload()}>Restart Quiz</button>
        </div>
      )}
      {questions.length > 0 && !showScore && (
        <div>
          <h2>Question {currentQuestionIndex + 1}/{questions.length}</h2>
          <h3>{questions[currentQuestionIndex].question}</h3>
          <ul>
            {[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer]
              .sort(() => Math.random() - 0.5)
              .map((answer) => (
                <li key={answer} onClick={() => handleAnswerClick(answer === questions[currentQuestionIndex].correct_answer)}>
                  {answer}
                </li>
              ))}
          </ul>
        </div>
      )}
       {results.length > 0 && (
        <div>
          <h2>Results</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.Category}</td>
                  <td>{result.Score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};