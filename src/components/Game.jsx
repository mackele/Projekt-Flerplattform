
import React, {useState} from 'react'
import { fetchQuestionsByCategory } from '../utils/trivia';
import Menu from './Menu';
import Question from './Question';
import Scoreboard from './Scoreboard';


export default function Game() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('easy');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);


  /**
   * Function that starts the question game by fetching the questions and setting the game variables
   */
  async function handleStartQuiz () {
    const quizQuestions = await fetchQuestionsByCategory(
      numQuestions, selectedCategory, difficulty
    );
    setCurrentQuestionIndex(0);
    setQuestions(quizQuestions);
    setScore(0);
    console.log("Quizen startar");
  };
  

  return (
    <div className={selectedCategoryName}>
      <div id="container">
        {/* Display the menu if the game is not executed */}
        {!questions.length > 0 && (
          <div id="menu">
            <Menu categories={categories} setCategories={setCategories}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            selectedCategoryName={selectedCategoryName} setSelectedCategoryName={setSelectedCategoryName}
            numQuestions={numQuestions} setNumQuestions={setNumQuestions}
            questions={questions} setQuestions={setQuestions}
            difficulty={difficulty} setDifficulty={setDifficulty}/>

            <button onClick={handleStartQuiz} disabled={!selectedCategory}>Starta quiz</button> 
          </div>
        )}

        {/* Display the questions when the game is executed */}
        {questions.length > 0 && (
          <div id='questions'> 
            <Question questions={questions} questionIndex={currentQuestionIndex} score={score} setScore={setScore} setCurrentQuestionIndex={setCurrentQuestionIndex} selectedCategoryName={selectedCategoryName} difficulty={difficulty}></Question>
          </div>
        )}
        
        {/* Display the scoreboard in the main menu if the game is not executed */}
        {!questions.length > 0 && (
          <div>
            <Scoreboard />
          </div>
        )}
      </div>
    </div>
  );
};