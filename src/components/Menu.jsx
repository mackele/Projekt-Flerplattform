
import React, { useEffect } from 'react'
import { fetchCategories } from '../utils/trivia';


export default function Menu(props) {
  const { categories, setCategories, selectedCategory, setSelectedCategory, setSelectedCategoryName, numQuestions, setNumQuestions, difficulty, setDifficulty } = props;
  
  
  /**
   * Function that fetch and set the categories
   */
  useEffect(function categories() {
    async function fetchCategoriesData () {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    fetchCategoriesData();
  }, [setCategories]);


  /**
   * Function that set the selected category both by id (setSelectedCategory) and name (setSelectedCategoryName)
   * @param {Event} event - The onclick event that invokes the function
   */
  function selectCategory (event) {
    const selectedCategoryID = (event.target.value);
    setSelectedCategory(selectedCategoryID);
    const selectedCategoryName = categories.find((category) => Number(category.id) === Number(selectedCategoryID));
    setSelectedCategoryName(selectedCategoryName ? selectedCategoryName.name : null);
  };

  
  /**
   * Function that set the number of selected questions
   * @param {Event} event - The onclick event that invokes the function
   */
  function selectAmountOfQuestions(event) {
    setNumQuestions(Number(event.target.value));
  };


  /**
   * Function that set the difficulty of the questions
   * @param {Event} event - The onclick event that invokes the function
   */
  function selectDifficulty(event) {
    setDifficulty(String(event.target.value));
  };
  

  return (
    <div>
      <label>
        Category
        <select id="selectCategory" value={selectedCategory ? selectedCategory : 0} onChange={selectCategory}>
          <option>Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label>
          Number of questions
          <input id="selectNoQ" type="number" min="5" max="20" value={numQuestions} onChange={selectAmountOfQuestions} />
      </label>

      <label>
      Difficulty 
        <select id="selectDifficulty" value={difficulty ? difficulty : 0} onChange={selectDifficulty}>
          <option>Select difficulty</option>
          <option key={'easy'} value={'easy'}>Easy</option>
          <option key={'medium'} value={'medium'}>Medium</option>
          <option key={'hard'} value={'hard'}>Hard</option>
        </select>
      </label>
    </div>
  );
};