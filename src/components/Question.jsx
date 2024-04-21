import QuestionTimer from "./QuestionTimer"
import Answers from "./Answers"
import { useState } from "react"

import QUESTIONS from "../Question.js";


export default function Question({ index, onSelectedAnswer, onSkipAnswer }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectedAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = 'unanswered';

    if (answer.selectedAnswer && answer.isCorrect === null) {
        answerState = answer.isCorrect ? 'correct' : 'incorrect';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    console.log(answerState)

    return (
        <div id="question">
            <QuestionTimer key={timer} timer={timer} onTimeout={answer.selectedAnswer === 'unanswered' ? onSkipAnswer : null} mode={answerState} />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelectedAnswer={handleSelectAnswer}

            />
        </div>
    )
}