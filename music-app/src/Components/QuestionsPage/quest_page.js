import React from 'react';
import FourOptionsButton from './FourOptions';
import './FourOptions.css';
//import Timer from './countdown';
//import { CountdownCircleTimer } from "react-countdown-circle-timer";
import MyCountdown from './roundTimer';



let AllQuestions = {
    question: "Question/song goes here",
    answer1: "1",
    answer2: "2",
    answer3: "3",
    answer4: "4"
}

function QuestPage () {
    return (
        <div className="QuestionAndAnswers">
            <div className="Question">
                <h1>{AllQuestions.question}</h1>
            </div>
            <div className="FourButtons">
                <div className="ButtonRowTop">
                    <div className="button1">
                        <FourOptionsButton question={AllQuestions.answer1}/>
                    </div>
                    <div className="button2">
                        <FourOptionsButton question={AllQuestions.answer2}/>
                    </div>
                </div>
                <div>
                    <MyCountdown />
                </div>
                <div className="ButtonRowBottom">
                    <div className="button3">
                        <FourOptionsButton question={AllQuestions.answer3}/>
                    </div>
                    <div className="button4">
                        <FourOptionsButton question={AllQuestions.answer4}/>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default QuestPage;