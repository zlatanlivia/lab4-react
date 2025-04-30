import { useEffect } from 'react';
import { useQuiz } from './context/QuizContext'; 
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const { state, setTheme, startQuiz } = useQuiz(); 
  const { theme, stage } = state; 

  useEffect(() => {
    document.body.className = theme; 
  }, [theme]);

  const toggleTheme = () => {
    setTheme(); 
  };

  const handleStartQuiz = (user, shuffle, timer, category, difficulty) => {
    console.log('handleStartQuiz called with:', { user, shuffle, timer, category, difficulty });
    startQuiz({ user, shuffle, timer, category, difficulty });
  };

  return (
    <div className={`app ${theme}`}>
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      {stage === 'start' && <StartPage handleStartQuiz={handleStartQuiz} />}
      {stage === 'quiz' && <QuizPage />}
      {stage === 'result' && <ResultPage />}
    </div>
  );
}

export default App;
