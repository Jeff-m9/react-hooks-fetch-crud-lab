import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        onDeleteQuestion(id);
      })
      .catch((err) => console.error("Error deleting question:", err));
  }

  function handleCorrectAnswerChange(id, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: parseInt(newCorrectIndex) }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        onUpdateQuestion(updatedQuestion);
      })
      .catch((err) => console.error("Error updating question:", err));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <strong>{question.prompt}</strong>
            <br />
            <label>
              Correct Answer:
              <select
                value={question.correctIndex}
                onChange={(e) =>
                  handleCorrectAnswerChange(
                    question.id,
                    parseInt(e.target.value)
                  )
                }
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>
                    {answer}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => handleDeleteClick(question.id)}>
              Delete Question
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
