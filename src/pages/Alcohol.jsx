import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Alcohol = () => {
    const questions = [
        {
          question: 'How often do you feel the need or urge to drink alcohol?',
        },
        {
            question: 'Have you ever tried to cut down or control your alcohol consumption?',
        },
        {
            question: 'Has your alcohol consumption ever caused problems in your personal relationships or friendships?',
        },
        {
            question: 'Have you ever faced any academic difficulties (e.g., failing in exams, missing an important deadline) due to drinking alcohol?',
        },
        {
            question: 'How often have you experienced withdrawal symptoms (e.g., shakiness, sweating, nausea) when you have not consumed alcohol for some time?',
        },
        {
            question: 'Do you often drink more alcohol than you initially intended?',
        },
        {
            question: 'Have you ever tried to hide your alcohol consumption from others?',
        },
        {
            question: 'Has your alcohol consumption affected your mental or physical health negatively?',
        },
        {
            question: 'How many drinks do you have on a typical drinking day?',
        },
        {
            question: 'Do you often drink alone?',
        },
        {
            question: 'Do you spend a significant amount of time obtaining, using, or recovering from alcohol?',
        },
        {
            question: 'Do you feel guilty or ashamed about your drinking behavior?',
        },
        {
            question: 'Have you experienced financial difficulties as a result of spending money on alcohol?',
        },
      ];
    

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [error, setError] = useState('');
  const [quizInfo, setQuizInfo] = useState(new Map());

  const handleAnswerSelect = (number,question) => {
    setSelectedAnswer(number);
    setQuizInfo((prevQuizInfo) => new Map(prevQuizInfo.set(question, number)));
  };

 

//   async function handleSubmit(e) {
//     e.preventDefault();
//     console.log(quizInfo);
//     try {
//     //   await axios.post('http://localhost:8000/answers', {
//     //     quizInfo: Object.fromEntries(quizInfo),
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setError('');
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer('');
    } else {
      setError('Please select an option');
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];

    return (
      <div className="p-4">
        {error && (
          <div className="bg-red-200 text-red-800 py-2 px-4 rounded-md mb-4">
            {error}
          </div>
        )}
        <h2 className="text-xl font-semibold mb-2 p-4">{question.question}</h2>
        <ul className="flex flex-wrap justify-center max-w-xl mx-auto">
          <div className="p-4">
            {Array.from(Array(5).keys()).map((number) => (
              <label key={number} className="mr-6 mb-4">
                <input
                  type="radio"
                  name="answer"
                  value={number + 1}
                  checked={selectedAnswer === number + 1}
                  onChange={() => handleAnswerSelect(number + 1, question.question)}
                  className="mr-2 appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-black checked:border-transparent"
                />
                <span>{number + 1}</span>
              </label>
            ))}
          </div>
        </ul>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleNextQuestion}
            className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const showSiteBlocker = false;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white p-4 rounded shadow-lg">
        {currentQuestion < questions.length ? (
          renderQuestion()
        ) : (
          <Link to = "/Support">
            <button className="w-full bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Alcohol;
