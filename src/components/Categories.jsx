import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { doc, collection, getDocs } from "firebase/firestore";
import db from '../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';


const Categories = ({ category }) => {
  const navigate = useNavigate();

  const backToHome = async () => {
    navigate("/");
  }

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const categoryDoc = doc(db, 'categories', category); 
      const questionsCollection = collection(categoryDoc, 'questions');
      const questionSnapshot = await getDocs(questionsCollection);
      const fetchedQuestions = questionSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      console.log("Fetched Questions:", fetchedQuestions);

      const uniqueQuestions = [];
      while(uniqueQuestions.length < 5) {
        const randomIndex = Math.floor(Math.random() * fetchedQuestions.length);
        if(!uniqueQuestions.includes(fetchedQuestions[randomIndex])) {
          uniqueQuestions.push(fetchedQuestions[randomIndex]);
        }
      }

      const questionsWithImages = await Promise.all(uniqueQuestions.map(async (question) => {
        if (question.image) {
          const imageRef = ref(storage, question.image);
          const url = await getDownloadURL(imageRef);
          return { ...question, imageURL: url };
        }
        return question;
      }));

      setQuestions(questionsWithImages);
      setCurrentQuestion(questionsWithImages[0]);
    };

    if (start) {
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setAnswered(false);
      fetchData();
    }
  }, [start, category]);

  const handleStart = () => {
    setStart(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
    setCurrentQuestion(questions[currentIndex + 1]);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setAnswered(false);
  };

  const handleAnswerClick = (index) => {
    if(!answered) {
      setSelectedAnswer(index);
      const correctIndex = questions[currentIndex].correctIndex;
      setIsCorrect(index === correctIndex);
      if(index === correctIndex) {
        setCorrectAnswers(prevCount => prevCount + 1);
      }
      setAnswered(true);
    } 
  };

  return (
    <div>
      <h1>{`${category} Quiz`}</h1>
      {!start ? (
        <div>
            <button onClick={handleStart}>Start</button>
            <button onClick={backToHome}>Powrót</button>
        </div>
      ) : currentQuestion ? (
        <div>
          <h2>{currentQuestion.question}</h2>
          {currentQuestion && currentQuestion.imageURL && <img src={currentQuestion.imageURL} alt="Question" />}
          {console.log(currentQuestion.imageURL)}
          {currentQuestion && (
            <ul>
              {currentQuestion.answers.map((answer, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: selectedAnswer === index
                      ? (isCorrect ? 'green' : 'red')
                      : 'transparent',
                  }}
                  onClick={() => handleAnswerClick(index)}
                  className={answered ? 'disabled' : ''}
                >
                  {answer}
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleNextQuestion}>Następne pytanie</button>
        </div>
      ) : (
        <div>
          {correctAnswers !== undefined && (
                <p>Liczba poprawnych odpowiedzi: {correctAnswers}</p>
            )}
          <button onClick={backToHome}>Powrót</button>
        </div>
      )}
    </div>
  );
}

export default Categories;
