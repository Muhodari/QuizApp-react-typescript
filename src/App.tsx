import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
import { QuestionState, Difficulty } from "./API";
// components
import QuestionCard from "./components/QuestionCard";
// styles
import { GlobleStyle, Wrapper } from "./App.styles";

export type AswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };


  
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      // user answers
      const answer= e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer ===answer;
      // add score if the answer is correct 

      if(correct) setScore(prev => prev + 1)
      // save answers in array for user answers
      const answerObject={
        question:questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer,
      }
      setUserAnswers(prev =>[...prev,answerObject]);
      

      
      

    }
  };

  const nextQuestion = () => {
   const nextQuestion = number + 1;

   if(nextQuestion === TOTAL_QUESTIONS){
        setGameOver(true);
   }else{
     setNumber(nextQuestion);
   }


  };

  return (
    <>
    <GlobleStyle />
    <Wrapper>
      <h1>General knowledge QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}

      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
   </Wrapper>
    </>
  );
};

export default App;

// https://opentdb.com/api.php?amount=10&type=multiple
