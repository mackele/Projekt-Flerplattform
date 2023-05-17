
import React, {useState} from 'react'
import Menu from './Menu';
import Question from './Question';
import { fetchQuestionsByCategory } from '../utils/trivia';


export default function Game() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);


  async function handleStartQuiz () {
    const quizQuestions = await fetchQuestionsByCategory(
      numQuestions, selectedCategory
    );
    setCurrentQuestionIndex(0);
    setQuestions(quizQuestions);
    setScore(0);
    console.log("Quizen startar");
  };
  

  return (
    <div id="container">
      <h1>Game component</h1>
      {!questions.length && (
        <div id="menu">
          <Menu categories={categories} setCategories={setCategories}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          selectedCategoryName={selectedCategoryName} setSelectedCategoryName={setSelectedCategoryName}
          numQuestions={numQuestions} setNumQuestions={setNumQuestions}
          questions={questions} setQuestions={setQuestions}/>

          <button onClick={handleStartQuiz} disabled={!selectedCategory}>Starta denna fantastiska quiz</button> 
        </div>
      )}
      {questions.length > 0 && (
        <Question questions={questions} questionIndex={currentQuestionIndex} score={score} setScore={setScore} setCurrentQuestionIndex={setCurrentQuestionIndex} selectedCategoryName={selectedCategoryName}></Question>
      )}
    </div>
  );
};