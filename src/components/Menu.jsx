
import React, { useEffect } from 'react'
import { fetchCategories } from '../utils/trivia';


export default function Menu(props) {
  const { categories, setCategories, selectedCategory, setSelectedCategory, selectedCategoryName, setSelectedCategoryName,
    numQuestions, setNumQuestions, questions, setQuestions
  } = props;
  
  useEffect(function categories() {
    async function fetchCategoriesData () {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    fetchCategoriesData();
  }, []);


  function selectCategory (event) {
    const selectedCategoryID = (event.target.value);
    setSelectedCategory(selectedCategoryID);
    const selectedCategoryName = categories.find((category) => Number(category.id) === Number(selectedCategoryID));
    setSelectedCategoryName(selectedCategoryName ? selectedCategoryName.name : null);
  };


  function selectAmountOfQuestions(event) {
    setNumQuestions(Number(event.target.value));
  };

  
  return (
    <div>
      <label>
        Category
        <select value={selectedCategory} onChange={selectCategory}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label>
          Number of questions:
          <input type="number" min="5" max="20" value={numQuestions} onChange={selectAmountOfQuestions} />
      </label>
    </div>
  );
};