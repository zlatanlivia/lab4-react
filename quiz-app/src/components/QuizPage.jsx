import { useQuiz } from '../context/QuizContext'; 
import { useState, useEffect } from 'react';

export default function QuizPage() {
  const { state, answerQuestion, nextQuestion } = useQuiz(); 
  const [timeLeft, setTimeLeft] = useState(state.settings.timer);
  
  const currentQuestion = state.questions[state.current];

  useEffect(() => {
    setTimeLeft(state.settings.timer);
    if (state.settings.timer > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            answerQuestion(null); 
            nextQuestion(); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state.current, state.settings.timer, answerQuestion, nextQuestion]);


  return (
    <div className="quiz-page">
      <h2>Întrebarea {state.current + 1}: {currentQuestion.question}</h2>
      <div className="options">
        {currentQuestion.options.map((opt, i) => (
          <button key={i} onClick={() => answerQuestion(opt)}>{opt}</button>
        ))}
      </div>
      {state.settings.timer > 0 && <p>Timp rămas: {timeLeft}s</p>}
    </div>
  );
}
