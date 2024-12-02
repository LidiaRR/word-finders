import { useContext, useState } from "react";
import styled from "styled-components";
import { ActivitiesContext } from "./ActivitiesProvider";

const bingos = [
  [
    [1, 2],
    [3, 6],
    [4, 8],
  ],
  [
    [0, 2],
    [4, 7],
  ],
  [
    [0, 1],
    [5, 8],
    [4, 6],
  ],
  [
    [4, 5],
    [0, 6],
  ],
  [
    [3, 5],
    [1, 7],
    [0, 8],
    [2, 6],
  ],
  [
    [3, 4],
    [2, 8],
  ],
  [
    [7, 8],
    [0, 3],
    [2, 4],
  ],
  [
    [6, 8],
    [1, 4],
  ],
  [
    [6, 7],
    [2, 5],
    [0, 4],
  ],
];

// Dark overlay with transparency
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(
    0,
    0,
    0,
    0.7
  ); /* Darker background to match overall theme */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Container for modal, with soft shadows and rounded corners
const Container = styled.div`
  background-color: #2c5364; /* Matching with the app's gradient theme */
  color: white;
  padding: 20px;
  border-radius: 12px; /* More rounded corners */
  position: relative;
  width: 800px;
  max-width: 90%; /* Ensures modal is responsive */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease; /* Smooth transition for the modal appearance */
  box-sizing: border-box; /* Ensure padding is included in width calculation */
`;

const FeedbackText = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px; /* Space below feedback and above inputs */
  text-align: center; /* Center feedback text */
`;

const AnswerInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "#8a2be2")};
  border-radius: 8px;
  background-color: ${({ hasError }) => (hasError ? "#ffe6e6" : "#f5f5f5")};
  color: #333;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? "red" : "#90ee90")};
    background-color: ${({ hasError }) => (hasError ? "#ffe6e6" : "#eafaf1")};
  }

  &::placeholder {
    color: #aaa;
  }
`;

// Styled submit button with hover and active effects
const SubmitButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  color: white;
  background-color: #90ee90; /* Light Green */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #7ecb7f; /* Slightly darker green on hover */
    transform: scale(1.05); /* Slight zoom effect */
  }

  &:active {
    background-color: #6fa56f; /* Darker green when clicked */
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

function isBingo({ idx, activityList }: { idx: number; activityList: any }) {
  // const {activityList} = useContext(ActivitiesContext)
  let isBingoIdx = false;
  let bingoSquares = [];
  let numBingos = 0;
  for (let possibleBingo of bingos[idx]) {
    let thisBingo = true;
    for (let square of possibleBingo) {
      if (!activityList[square].completed) thisBingo = false;
    }
    if (thisBingo) {
      isBingoIdx = true;
      ++numBingos;
      bingoSquares.push(idx);
      bingoSquares.push(possibleBingo);
    }
  }
  return { isBingoIdx, bingoSquares, numBingos };
}

function Modal({
  idx,
  setShowConfetti,
  setNumBingos,
}: {
  idx: number;
  setShowConfetti: any;
  setNumBingos: any;
}) {
  const { activityList, setActivityList } = useContext(ActivitiesContext);
  const [answers, setAnswers] = useState<string[]>(
    activityList[idx].answers.map(() => "")
  ); // Keep input values as strings for now
  const [feedback, setFeedback] = useState("");
  const [errorIndices, setErrorIndices] = useState<number[]>([]);

  if (!activityList[idx].guessing) return null;

  const handleInputChange = (value: string, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setFeedback("");
    setErrorIndices([]);
  };

  const handleSubmit = () => {
    const correctAnswers = activityList[idx].answers;
    const incorrectIndices = answers
      .map((answer, index) => {
        const correctAnswer = correctAnswers[index];

        // Validate against single values or arrays of valid answers
        const isCorrect = Array.isArray(correctAnswer)
          ? correctAnswer.some((valid) =>
              typeof valid === "number"
                ? Number(answer) === valid
                : answer.trim().toLowerCase() ===
                  String(valid).trim().toLowerCase()
            )
          : typeof correctAnswer === "number"
          ? Number(answer) === correctAnswer
          : answer.trim().toLowerCase() ===
            String(correctAnswer).trim().toLowerCase();

        return isCorrect ? null : index;
      })
      .filter((index) => index !== null) as number[];

    if (incorrectIndices.length === 0) {
      console.log("All answers correct!");
      const updatedActivityList = activityList.map((activity, i) =>
        i === idx ? { ...activity, completed: true, guessing: false } : activity
      );
      setActivityList(updatedActivityList);
      localStorage.setItem("activityList", JSON.stringify(updatedActivityList));

      const { isBingoIdx, numBingos } = isBingo({ idx, activityList });
      if (isBingoIdx) {
        setShowConfetti(true);
        setNumBingos(numBingos);
        setTimeout(() => setShowConfetti(false), 30000);
      } else {
        setShowConfetti(false);
        setNumBingos(0);
      }
    } else {
      console.log("Some answers incorrect!");
      setFeedback("Some answers are incorrect. Please try again!");
      setErrorIndices(incorrectIndices);
    }
  };

  return (
    <Overlay>
      <Container>
        <h3 style={{ whiteSpace: "pre-line" }}>{activityList[idx].question}</h3>

        {activityList[idx].answers.map((_, index) => (
          <AnswerInput
            key={index}
            placeholder={`Answer ${index + 1}`}
            value={answers[index]}
            onChange={(e) => handleInputChange(e.target.value, index)}
            hasError={errorIndices.includes(index)}
          />
        ))}
        {feedback && <FeedbackText>{feedback}</FeedbackText>}
        <SubmitButton onClick={handleSubmit}>Submit your answers</SubmitButton>
      </Container>
    </Overlay>
  );
}

export default Modal;
