
import React, {useState} from 'react'
import Menu from './Menu';


export default function Game() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [numQuestions, setNumQuestions] = useState(1);
  const [questions, setQuestions] = useState([]);
  

  return (
    <div>Game component
      <Menu categories={categories} setCategories={setCategories}
      selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
      selectedCategoryName={selectedCategoryName} setSelectedCategoryName={setSelectedCategoryName}
      numQuestions={numQuestions} setNumQuestions={setNumQuestions}
      questions={questions} setQuestions={setQuestions}/>
    </div>
  );
};