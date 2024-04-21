import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelectedAnswer }) {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    console.log(answers)

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answers) => {
                const isSelected = selectedAnswer === answers;
                let cssClasses = '';

                if (answerState === 'answered' && isSelected) {
                    cssClasses = 'selected'
                }

                if ((answerState === 'correct' || answerState === 'incorrect') && isSelected) {
                    cssClasses = answerState === 'incorrect' ? 'wrong' : answerState;
                }

                return (
                    <li key={answers} className="answer">
                        <button onClick={() => onSelectedAnswer(answers)} className={cssClasses} disabled={answerState !== 'unanswered'}>{answers}</button>
                    </li>
                )
            })}
        </ul>
    )
}