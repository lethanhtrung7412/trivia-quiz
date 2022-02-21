import React from "react";
import { nanoid } from "nanoid";
import Question from "./Question";

const Questions = () => {
  const [questions, setQuestions] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [game, setGame] = React.useState(false);
  const [start, setStart] = React.useState(false);
  const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());

  function newGame() {
    setGame((prevVal) => !prevVal);
    setScore(0);
    setChecked(false);
  }
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          data.results.map((arr) => ({
            id: nanoid(),
            question: arr.question,
            options: shuffle([
              ...arr.incorrect_answers,
              arr.correct_answer,
            ]).map((content) => ({
              id: nanoid(),
              text: content,
              isSelected: false,
              heldCorrect: false,
              heldIncorrect: false,
              answer: content,
              correct: content === arr.correct_answer ? true : false,
              isHold: false,
            })),
          }))
        )
      );
  }, [game]);

  function runHold(ansId, quesId) {
    setQuestions((prevState) =>
      prevState.map((question) => {
        if (question.id === quesId) {
          const answerList = question.options.map((answer) => {
            if (answer.id === ansId || answer.isHold) {
              return {
                ...answer,
                isHold: !answer.isHold,
              };
            } else {
              return answer;
            }
          });
          return {
            ...question,
            options: answerList,
          };
        } else {
          return question;
        }
      })
    );
  }

  function checkAnswer() {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        const checkedAnswer = question.options.map((answer) => {
          if (answer.isHold && !answer.correct) {
            return {
              ...answer,
              heldIncorrect: true,
              isSelected: true,
            };
          } else if (answer.isHold && answer.correct) {
            setScore((prevVal) => prevVal + 1);
            return {
              ...answer,
              heldCorrect: true,
              isSelected: true,
            };
          } else {
            return {
              ...answer,
              isSelected: true,
            };
          }
        });
        return {
          ...question,
          options: checkedAnswer,
        };
      })
    );
    setChecked(true);
  }

  function startGame() {
    setStart((prevVal) => !prevVal);
  }

  const questionElm = questions.map((question) => {
    return (
      <Question
        id={question.id}
        key={question.id}
        question={question.question}
        options={question.options}
        runHold={runHold}
      />
    );
  });
  return (
    <>
      {start ? (
        <div className="questions">
          {questionElm}

          {checked ? (
            <div className="results">
              <span className="score">You have {score}/5 correct answers</span>
              <button className="btn center" onClick={newGame}>
                New game
              </button>
            </div>
          ) : (
            <div className="check">
              <button className="btn center answer-check" onClick={checkAnswer}>
                Check answer
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="start">
          <div className="center title">Trivia quiz</div>
          <div className="btn center" onClick={startGame}>
            Start
          </div>
        </div>
      )}
    </>
  );
};

export default Questions;
