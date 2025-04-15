import React from 'react';

const QuestionCard = ({ questionData, selectedWords, onAnswerChange }) => {
  const { question, options } = questionData;

  const blanks = question.split('___').length - 1 || 4; 

  const handleWordClick = (word) => {
    if (selectedWords.includes(word)) return;

    if (selectedWords.length < blanks) {
      onAnswerChange([...selectedWords, word]);
    }
  };

  const handleBlankClick = (index) => {
    const updated = [...selectedWords];
    updated.splice(index, 1);
    onAnswerChange(updated);
  };

  const display = question.replace(/___________/g, () => {
    const index = selectedWords.findIndex((_, i) => i === selectedWords.length);
    return `<span class='inline-block border-b-2 px-2'>${selectedWords[index] || ''}</span>`;
  });

  return (
    <div>
      <p className="text-lg font-medium mb-4">
        {question.split(' ').map((word, idx) => {
          if (word.includes('___________')) {
            const blankIndex = selectedWords.length;
            return (
              <span
                key={idx}
                className="inline-block border-b-2 px-2 mx-1 cursor-pointer"
                onClick={() => handleBlankClick(blankIndex)}
              >
                {selectedWords[blankIndex] || '__________'}
              </span>
            );
          }
          return <span key={idx} className="mx-1">{word}</span>;
        })}
      </p>

      <div className="flex flex-wrap gap-3">
        {options.map((word, idx) => (
          <button
            key={idx}
            onClick={() => handleWordClick(word)}
            disabled={selectedWords.includes(word)}
            className={`px-4 py-2 border rounded shadow ${selectedWords.includes(word) ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-blue-100'}`}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
