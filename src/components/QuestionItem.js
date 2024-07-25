import React from "react";

function QuestionItem({ question, questionDelete, questionsOnPage}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  
  

  function handleCorrectAnswer(event) {
    let selecetedValue = event.target.value
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body:
        JSON.stringify({"correctIndex": parseInt(selecetedValue)}) 
    })
      .then((r) => r.json())
      .then((updatedAnswer) => {
          const updatedAnswers = questionsOnPage.map(q => 
            q.id === updatedAnswer.Id ? updatedAnswer : q
          );
          questionDelete(updatedAnswers)
  })
      
  }


  function handleDeleteClick(deletedQuestion) {
    const deletedQuestions = questionsOnPage.filter((data) => data.id !== deletedQuestion.id)
      questionDelete(deletedQuestions)
  }

  function  handleDelete() {
      fetch(`http://localhost:4000/questions/${question.id}`, {
        method: "DELETE",
      })

      .then(() =>{ 
        console.log(question)
        handleDeleteClick(question)
  })

  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleCorrectAnswer} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
