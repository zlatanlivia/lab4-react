import { useQuiz } from '../context/QuizContext';
import '../App.css';

const ResultPage = () => {
  const { state, resetQuiz } = useQuiz();

  const highestScores = state.history.reduce((acc, entry) => {
    if (!acc[entry.user] || entry.score > acc[entry.user]) {
      acc[entry.user] = entry.score;
    }
    return acc;
  }, {});

  return (
    <div className="result-page">
      <h1>Rezultatul tău: {state.score}/{state.questions.length}</h1>

      <h2>Despre răspunsurile tale:</h2>
      <ul className="answers-list">
        {state.answers.map((entry, index) => (
          <li key={index} className={entry.isCorrect ? 'correct' : 'incorrect'}>
            <strong>Întrebarea {index + 1}: {entry.question.question}</strong><br />
            Ai ales: {entry.answer}<br />
            {entry.isCorrect
              ? 'Răspuns corect ✅ '
              : `Răspuns greșit ❌ (Răspuns corect: ${entry.question.correct})`}
          </li>
        ))}
      </ul>

      <h2>Tabel cu rezultatele utilizatorilor:</h2>
      <table className="score-table">
        <thead>
          <tr>
            <th>Utilizator</th>
            <th>Scor maxim</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(highestScores).map(([user, score]) => (
            <tr key={user}>
              <td>{user}</td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="reset-button" onClick={resetQuiz}>Începe din nou</button>
    </div>
  );
};

export default ResultPage;