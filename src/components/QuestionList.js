import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questionsOnPage, questionDelete }) {


  function handleQuestions () {
    return questionsOnPage.map((data) => {
      return <QuestionItem key={data.id} question={data} questionsOnPage={questionsOnPage} questionDelete={questionDelete} />
    })
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{handleQuestions()}</ul>
    </section>
  );
}

export default QuestionList;
