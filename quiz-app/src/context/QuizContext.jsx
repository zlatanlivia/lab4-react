import { createContext, useState, useContext } from 'react';
import questionsData from '../data/questions.json';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [state, setState] = useState({
    user: '',
    theme: 'light',
    stage: 'start',
    questions: [],
    current: 0,
    score: 0,
    history: JSON.parse(localStorage.getItem('quizHistory')) || [],
    settings: { shuffle: false, timer: 0, category: '', difficulty: '' },
    answers: []
  });

  const setTheme = () => {
    setState((prev) => {
      const newTheme = prev.theme === 'light' ? 'dark' : 'light';
      document.body.className = newTheme;
      return {
        ...prev,
        theme: newTheme
      };
    });
  };

  const startQuiz = ({ user, shuffle, timer, category, difficulty }) => {
    const allQuestions = Object.values(questionsData)
      .flatMap(category => Object.values(category).flat())
      .flat();
  
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, 5);
  
    if (selectedQuestions.length === 0) {
      alert('Nu s-au găsit suficiente întrebări!');
      return;
    }
  
    setState(prev => ({
      ...prev,
      user,
      settings: { shuffle, timer, category, difficulty },
      questions: selectedQuestions,
      current: 0,
      score: 0,
      stage: 'quiz',
      answers: []
    }));
  };
  

  const answerQuestion = (answer) => {
    const currentQ = state.questions[state.current];
    
    const normalizedUserAnswer = String(answer).trim().toLowerCase();
    const normalizedCorrectAnswer = String(currentQ.correct).trim().toLowerCase();
    
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    
    const newAnswers = [
      ...state.answers,
      { 
        question: currentQ, 
        answer, 
        isCorrect 
      }
    ];
  
    if (state.current + 1 < state.questions.length) {
      setState((prev) => ({
        ...prev,
        current: prev.current + 1,
        score: isCorrect ? prev.score + 1 : prev.score,
        answers: newAnswers
      }));
    } else {
      const newScore = isCorrect ? state.score + 1 : state.score;
      const newHistory = [
        ...state.history,
        { user: state.user, score: newScore }
      ];
      localStorage.setItem('quizHistory', JSON.stringify(newHistory));
  
      setState((prev) => ({
        ...prev,
        score: newScore,
        answers: newAnswers,
        history: newHistory,
        stage: 'result'
      }));
    }
  };

  const nextQuestion = () => {
    if (state.current + 1 < state.questions.length) {
      setState((prev) => ({
        ...prev,
        current: prev.current + 1
      }));
    }
  };

  const resetQuiz = () => {
    setState((prev) => ({ ...prev, stage: 'start' }));
  };

  return (
    <QuizContext.Provider
      value={{ state, setTheme, startQuiz, answerQuestion, nextQuestion, resetQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
