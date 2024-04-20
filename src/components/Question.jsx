import QuestionTimer from "./QuestionTimer"
import Answers from "./Answers"


export default function Question({ questionText, answers, onSelectedAnswer, selectedAnswer, answerState, onSkipAnswer }) {
    return (
        <div id="question">
            <QuestionTimer timer={10000} onTimeout={onSkipAnswer} />
            <h2>{questionText}</h2>
            <Answers
                answers={answers}
                selectedAnswer={selectedAnswer}
                answerState={answerState}
                onSelectedAnswer={onSelectedAnswer}

            />
        </div>
    )
}