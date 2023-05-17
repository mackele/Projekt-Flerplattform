import React, {useEffect, useState} from 'react'

export default function Scoreboard() {
  const [results, setResults] = useState([]);

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
      <h2>Ditt resultat</h2>
      {results.length > 0 && (
        <div>
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