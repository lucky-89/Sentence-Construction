import React from 'react';

const Result = ({ questions, answers }) => {
  const score = questions.reduce((acc, q, idx) => {
    const isCorrect = JSON.stringify(q.correctAnswer) === JSON.stringify(answers[idx]);
    return isCorrect ? acc + 1 : acc;
  }, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Score: {score} / {questions.length}</h2>
      {questions.map((q, idx) => {
        const userAnswer = answers[idx] || [];
        const isCorrect = JSON.stringify(q.correctAnswer) === JSON.stringify(userAnswer);
        return (
          <div key={q.id} className="mb-4 p-4 border rounded bg-white shadow">
            <p className="font-medium">{q.question}</p>
            <p className={`mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              Your Answer: {userAnswer.join(', ')}
            </p>
            {!isCorrect && (
              <p className="text-blue-600">
                Correct Answer: {q.correctAnswer.join(', ')}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Result;

