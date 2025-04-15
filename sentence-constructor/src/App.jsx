import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from './components/QuestionCard';
import Result from './components/Result';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(30);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/questions') 
      .then(res => {
        setQuestions(res.data);
        setAnswers(Array(res.data.length).fill([]));
      });
  }, []);

  useEffect(() => {
    if (!showResult && questions.length > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            handleNext();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentIdx, showResult]);

  const handleNext = () => {
    if (currentIdx === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentIdx(prev => prev + 1);
      setTimer(30);
    }
  };

  const updateAnswer = (wordList) => {
    const updated = [...answers];
    updated[currentIdx] = wordList;
    setAnswers(updated);
  };

  if (showResult) {
    return <Result questions={questions} answers={answers} />;
  }

  if (questions.length === 0) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Question {currentIdx + 1} / {questions.length}</h2>
      <div className="mb-4 text-red-600 font-semibold">Time Left: {timer}s</div>
      <QuestionCard
        questionData={questions[currentIdx]}
        selectedWords={answers[currentIdx]}
        onAnswerChange={updateAnswer}
      />
      <button
        className={`mt-4 px-6 py-2 bg-blue-600 text-white rounded ${answers[currentIdx].length === 4 ? '' : 'opacity-50 cursor-not-allowed'}`}
        onClick={handleNext}
        disabled={answers[currentIdx].length !== 4}
      >
        Next
      </button>
    </div>
  );
};

export default App;
