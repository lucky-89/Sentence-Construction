import React from "react";

export default function FeedbackScreen({ answers, questions, onRestart }) {
  let totalCorrect = 0;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">🎉 Feedback Summary</h2>

      {answers.map((answerObj, index) => {
        const question = questions.find(q => q.questionId === answerObj.questionId);
        const userAnswers = answerObj.selected;
        const correctAnswers = question.correctAnswer;

        // Count correct words
        const correctCount = userAnswers.filter((ans, idx) => ans === correctAnswers[idx]).length;
        totalCorrect += correctCount === correctAnswers.length ? 1 : 0;

        return (
          <div key={index} className="mb-8 border-b pb-4">
            <p className="text-lg font-semibold mb-2">Q{index + 1}:</p>
            <p className="mb-2">
              {question.question.split(" ").map((word, i) => {
                if (word === "___________") {
                  const userWord = userAnswers.shift();
                  const correctWord = correctAnswers.shift();
                  const isCorrect = userWord === correctWord;

                  return (
                    <span
                      key={i}
                      className={`inline-block mx-1 px-2 py-1 rounded ${
                        isCorrect ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"
                      }`}
                    >
                      {userWord} {isCorrect ? "✅" : `❌ (${correctWord})`}
                    </span>
                  );
                }
                return <span key={i}>{word} </span>;
              })}
            </p>
          </div>
        );
      })}

      <div className="text-xl text-center font-bold mt-6 text-blue-600">
        Total Score: {totalCorrect} / {answers.length}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={onRestart}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
