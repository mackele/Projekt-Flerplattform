/**
 * Function that fetch questions by category
 * @param {Number} amount - The desired number of questions (maximum 50 per request) 
 * @param {Number} categoryId - The desired category with questions
 * @param {String} difficulty - The desired difficulty (easy, medium, hard)
 * @returns {Array} - An array with the questions
 */
export async function fetchQuestionsByCategory(amount, categoryId, difficulty) {
    try {
        const url = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple&category=${categoryId}&difficulty=${difficulty}`);
        const response = await url.json();
        const questionsByCategory = response.results;

        const questionsByCategoryArr = [];
        for (let i = 0; i < questionsByCategory.length; i++) {
            questionsByCategoryArr.push(questionsByCategory[i]);
        };
        return questionsByCategoryArr;
    } catch (error) {
        throw new Error(`Error with fetch of questions by category ${error.message}`);
    };
};


/**
 * Function that fetch all the categories
 * @returns {Array} - An array with the categories
 */
export async function fetchCategories() {
    try {
        const url = await fetch(`https://opentdb.com/api_category.php`);
        const response = await url.json();
        const categories = response.trivia_categories;

        const categoryArr = [];
        for (let i = 0; i < categories.length; i++) {
            categoryArr.push(categories[i]);
        };
        return categoryArr;
    } catch (error) {
        throw new Error(`Error with fetch of categories ${error.message}`);
    };
};