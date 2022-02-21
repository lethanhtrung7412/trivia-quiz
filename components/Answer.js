import React from "react";

const Answer = (props) => {
  let answerStyle = {};
  if (props.isSelected && props.correct) {
    answerStyle = {
      background: "#94D7A2",
      border: "none",
    };
  } else if (props.isSelected && props.heldIncorrect) {
    answerStyle = {
      background: "#F8BCBC",
      opacity: 0.5,
      border: "none",
    };
  } else {
    answerStyle = {
      background: props.isHold ? "#D6DBF5" : "none",
      cursor: "pointer",
    };
  }
  return (
    <div
      className="answer"
      style={answerStyle}
      onClick={props.runHold}
      dangerouslySetInnerHTML={{ __html: props.text }}
    ></div>
  );
};

export default Answer;
