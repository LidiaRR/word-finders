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
  width: 600px;
  max-width: 90%; /* Ensures modal is responsive */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease; /* Smooth transition for the modal appearance */
  box-sizing: border-box; /* Ensure padding is included in width calculation */
`;

// Styled input field with subtle border and focus effect
const AnswerInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  border: 1px solid #8a2be2; /* Violet border to match the overall theme */
  border-radius: 8px;
  background-color: #f5f5f5; /* Light background for input */
  color: #333; /* Darker text for readability */
  box-sizing: border-box; /* Ensure padding is included in width calculation */

  &:focus {
    outline: none;
    border-color: #90ee90; /* Light Green on focus */
    background-color: #eafaf1; /* Lighter background when focused */
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
  for (let possibleBingo of bingos[idx]) {
    let thisBingo = true;
    for (let square of possibleBingo) {
      if (!activityList[square].completed) thisBingo = false;
    }
    if (thisBingo) {
      isBingoIdx = true;
      bingoSquares.push(idx);
      bingoSquares.push(possibleBingo);
    }
  }
  return { isBingoIdx, bingoSquares };
}

function Modal({
  idx,
  setShowConfetti,
}: {
  idx: number;
  setShowConfetti: any;
}) {
  const { activityList, setActivityList } = useContext(ActivitiesContext);
  const [answer, setAnswer] = useState("");

  if (!activityList[idx].guessing) return null;

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value); // Update state with the new value
  };

  // Handle submit button click
  const handleSubmit = () => {
    console.log("User's answer:", answer);

    // Validate or process the answer here
    const correctAnswer = activityList[idx].answer;
    if (answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      console.log("Correct answer!");

      // Mark the activity as completed
      const updatedActivityList = activityList.map((activity, i) =>
        i === idx ? { ...activity, completed: true, guessing: false } : activity
      );
      setActivityList(updatedActivityList);

      const { isBingoIdx, bingoSquares } = isBingo({ idx, activityList });
      if (isBingoIdx) {
        setShowConfetti(true);

        // Stop confetti after 30 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 30000); // 30 seconds
      }
    } else {
      console.log("Incorrect answer, try again.");
    }
  };

  return (
    <Overlay>
      <Container>
        <h3>{activityList[idx].question}</h3> {/* Title for the question */}
        <AnswerInput
          placeholder="Type your answer here"
          value={answer}
          onChange={handleInputChange}
        />
        <SubmitButton onClick={handleSubmit}>Submit your answer</SubmitButton>
      </Container>
    </Overlay>
  );
}

export default Modal;
