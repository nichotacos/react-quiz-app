import { useEffect, useState } from "react";

export default function QuestionTimer({ timer, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timer)

    useEffect(() => {
        console.log('timer start')
        const timeout = setTimeout(onTimeout, timer);

        return () => {
            clearTimeout(timeout)
        }
    }, [timer, onTimeout])

    useEffect(() => {
        console.log('interval')
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 10)
        }, 10)

        return () => {
            clearInterval(interval)
        }
    }, [onTimeout])

    return (
        <progress id="question-time" value={remainingTime} max={timer} />
    )
} 