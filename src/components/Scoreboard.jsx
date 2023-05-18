
import React, {useEffect, useState} from 'react'


export default function Scoreboard() {
  const [results, setResults] = useState([]);


  /**
   * Function that fetch and set the results saved in localStorage
   */
  useEffect(function results() {
    function fetchResults() {
      const resultsData = localStorage.getItem('Results');
      if(resultsData) {
        setResults(JSON.parse(resultsData));
      }
    } fetchResults();
  }, []);


  return (
    <div>

      {/* Display the scoreboard if there are any results */}
      {results.length > 0 && (
        <div>
          <h2>Ditt resultat</h2>
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
                  <td>{result.Score}/{result.NumberOfQuestions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};