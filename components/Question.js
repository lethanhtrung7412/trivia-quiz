import React from "react";
import Answer from "./Answer";

const Question = (props) => {
  function runHold(id) {
    props.runHold(id, props.id);
  }
  const answerElm = props.options.map((data) => {
    return (
      <Answer
        answer={data.answer}
        key={data.id}
        isHold={data.isHold}
        isSelected={data.isSelected}
        runHold={() => runHold(data.id)}
        questionId={props.id}
        heldCorrect={data.heldCorrect}
        heldIncorrect={data.heldIncorrect}
        correct={data.correct}
        text={data.text}
      />
    );
  });
  return (
    <>
      <div className="question">
        <h3 dangerouslySetInnerHTML={{ __html: props.question }}></h3>
        <div className="options">{answerElm}</div>
      </div>
      <br />
    </>
  );
};

export default Question;
