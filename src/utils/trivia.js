
/**
 * Function that fetch questions
 * @param {Number} amount - The desired number of questions (maximum 50 per request) 
 * @returns {Array} - An array with the questions
 */
async function fetchQuestions(amount) {
    try {
        const url = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
        const response = await url.json();
        const questions = response.results;

        const questionsArr = [];
        for (let i = 0; i < questions.length; i++) {
            questionsArr.push(questions[i]);
        };
        console.log(questionsArr); // log the arr for verification
        return questionsArr;
    } catch (error) {
        throw new Error(`Error with fetch of questions ${error.message}`);
    };
};


/**
 * Function that fetch questions by category
 * @param {Number} amount - The desired number of questions (maximum 50 per request) 
 * @param {Number} categoryId - The desired category with questions
 * @returns {Array} - An array with the questions
 */
async function fetchQuestionsByCategory(amount, categoryId) {
    try {
        const url = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple&category=${categoryId}`);
        const response = await url.json();
        const questionsByCategory = response.results;

        const questionsByCategoryArr = [];
        for (let i = 0; i < questionsByCategory.length; i++) {
            questionsByCategoryArr.push(questionsByCategory[i]);
        };
        console.log(questionsByCategoryArr); // log the arr for verification
        return questionsByCategoryArr;
    } catch (error) {
        throw new Error(`Error with fetch of questions by category ${error.message}`);
    };
};


/**
 * Function that fetch all the categories
 * @returns {Array} - An array with the categories
 */
async function fetchCategories() {
    try {
        const url = await fetch(`https://opentdb.com/api_category.php`);
        const response = await url.json();
        const categories = response.trivia_categories;

        const categoryArr = [];
        for (let i = 0; i < categories.length; i++) {
            categoryArr.push(categories[i]);
        };
        console.log(categoryArr); // log the arr for verification
        return categoryArr;
    } catch (error) {
        throw new Error(`Error with fetch of categories ${error.message}`);
    };
};