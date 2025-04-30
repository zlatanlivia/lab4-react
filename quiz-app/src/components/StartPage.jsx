import { useState } from 'react';

export default function StartPage({ handleStartQuiz }) {
  const [name, setName] = useState('');
  const [shuffle, setShuffle] = useState(false);
  const [timer, setTimer] = useState(0);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    console.log('Starting quiz with:', { name, shuffle, timer, category, difficulty });
    handleStartQuiz(name, shuffle, timer, category, difficulty); 
  };

  return (
    <div className="start-page">
      <h1 className="quiz-title">Testează-ți cunoștințele</h1>
      <form onSubmit={handleSubmit} className="start-form">
        <input
          type="text"
          placeholder="Introdu numele"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>
          <b>Timp per întrebare (secunde)</b>
          <input
            type="number"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            min="0"
          />
        </label>

        <label>
          <b>Categorie</b>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={shuffle} 
          >
            <option value="">Alege categoria</option>
            <option value="tenis">Tenis</option>
            <option value="fotbal">Fotbal</option>
          </select>
        </label>

        <label>
         <b> Dificultate</b>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={shuffle}
          >
            <option value="">Alege dificultatea</option>
            <option value="easy">Ușor</option>
            <option value="medium">Mediu</option>
            <option value="hard">Greu</option>
          </select>
        </label>

        <label>
          <b>Ordine aleatorie</b>
          <input
            type="checkbox"
            checked={shuffle}
            onChange={(e) => setShuffle(e.target.checked)}
          />
        </label>

        <button type="submit">Începe Quiz-ul</button>
      </form>
    </div>
  );
}
