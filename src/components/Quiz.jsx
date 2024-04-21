import { useState, useCallback } from "react";

import QUESTIONS from "../Question.js";
import compeletedImg from "../assets/quiz-complete.png"
import Question from "./Question.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestion = userAnswers.length;

    const quizIsComplete = activeQuestion === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {

        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer];
        });
    }, []);

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
                index={activeQuestion}
                onSelectedAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}