import { useState, useCallback } from "react";

import QUESTIONS from "../Question.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

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
                <Summary userAnswers={userAnswers} />
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