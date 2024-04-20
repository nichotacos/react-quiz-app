import { useState, useCallback } from "react";

import QUESTIONS from "../Question.js";
import compeletedImg from "../assets/quiz-complete.png"
import Question from "./Question.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('unanswered');

    const activeQuestion = answerState === 'unanswered' ? userAnswers.length : userAnswers.length - 1;

    const quizIsComplete = activeQuestion === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {

        setAnswerState('answered');
        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer];
        })

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestion].answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('incorrect')
            }

            setTimeout(() => {
                setAnswerState('unanswered');
            }, 2000);
        }, 1000);
    }, [activeQuestion]);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null)
    }, [handleSelectAnswer]);

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={compeletedImg} alt="Compeleted Quiz Logo" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestion}
                questionText={QUESTIONS[activeQuestion].text}
                answers={QUESTIONS[activeQuestion].answers}
                onSelectedAnswer={handleSelectAnswer}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}