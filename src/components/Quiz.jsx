import { useState, useCallback } from "react";

import QUESTIONS from "../Question.js";
import compeletedImg from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestion = userAnswers.length;

    const quizIsComplete = activeQuestion === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer];
        })
        console.log(selectedAnswer)
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

    const shuffledAnswers = [...QUESTIONS[activeQuestion].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timer={10000} onTimeout={handleSkipAnswer} key={activeQuestion} />
                <h2>{QUESTIONS[activeQuestion].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answers) => (
                        <li key={answers} className="answer">
                            <button onClick={() => handleSelectAnswer(answers)}>{answers}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}