import compeletedImg from "../assets/quiz-complete.png";
import QUESTIONS from "../Question.js";

export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);


    const skippedAnswersShare = (skippedAnswers.length / userAnswers.length).toFixed(2) * 100;
    const correctAnswersShare = (correctAnswers.length / userAnswers.length).toFixed(2) * 100;
    const wrongAnswerShare = 100 - skippedAnswersShare - correctAnswersShare;


    return (
        <div id="summary">
            <img src={compeletedImg} alt="Compeleted Quiz Logo" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedAnswersShare}%</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className="number">{correctAnswersShare}%</span>
                    <span className="text">answered correctly</span>
                </p>
                <p>
                    <span className="number">{wrongAnswerShare}%</span>
                    <span className="text">answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClasses = 'user-answer';

                    if (answer === null) {
                        cssClasses += ' skipped';
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClasses += ' correct';
                    } else {
                        cssClasses += ' wrong';
                    }

                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cssClasses}>{answer ?? 'Skipped'}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    )

}