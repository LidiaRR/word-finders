import styled from "styled-components";
import { ActivitiesContext, ActivityElement } from "./ActivitiesProvider";
import { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import Confetti from "react-confetti";

const Wrapper = styled.div`
  flex-grow: 1; /* Allows this section to grow and center vertically */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -60px;
  flex-direction: column;
`;

const Container = styled.div`
  height: max-content;
`;

const Row = styled.div`
  height: max-content;
  display: flex;
`;

const SquareContainer = styled.a<{ completed: boolean }>`
  height: 100px;
  width: 100px;
  background-color: ${(props) =>
    props.completed
      ? "#90EE90"
      : "#9966CC"}; /* Completed: Light Green, Default: Amethyst */
  color: white;
  display: flex;
  text-decoration: none;
  border: 2px solid ${(props) => (props.completed ? "#32CD32" : "#8A2BE2")}; /* Border color for completed: Lime Green, Default: Violet */
  border-radius: 12px; /* Rounded corners */
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.completed ? "default" : "pointer")};
  font-size: 1.5rem;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s, border-color 0.3s; /* Smooth transitions */

  &:hover {
    background-color: ${(props) =>
      props.completed
        ? "#90EE90"
        : "#DA70D6"}; /* Orchid on hover for non-completed, Light Green for completed */
    transform: scale(1.05); /* Slight zoom effect */
    border-color: ${(props) =>
      props.completed
        ? "#228B22"
        : "#8A2BE2"}; /* Hover border color: Dark Green for completed, Violet for non-completed */
  }
`;

const CongratsMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: opacity 0.5s ease-in-out;
  background-color: #b0e0e6;
  color: #2f4f4f;
  border: 2px solid #4682b4;
`;

function BingoSquare({
  idx,
  setShowConfetti,
}: {
  idx: number;
  setShowConfetti: any;
}) {
  const { activityList, setActivityList } = useContext(ActivitiesContext);
  const onClick = () => {
    setActivityList((prevList: any) =>
      prevList.map((activity: any, i: number) =>
        i === idx ? { ...activity, guessing: true } : activity
      )
    );
  };

  return (
    <SquareContainer
      href={activityList[idx].link}
      target="_blank"
      completed={activityList[idx].completed}
      onClick={onClick}
    >
      {activityList[idx].num}
    </SquareContainer>
  );
}

function BingoCard() {
  const { setActivityList } = useContext(ActivitiesContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [numBingos, setNumBingos] = useState(0);

  useEffect(() => {
    const savedStatus = localStorage.getItem("activityList");
    if (savedStatus) {
      setActivityList(JSON.parse(savedStatus));
    } else {
      let activities: ActivityElement[] = [
        {
          num: 1,
          link: "https://colab.research.google.com/drive/1o-x8y-CCmh-n3zaoEysJYOpjNjjWVlZu?usp=sharing",
          question:
            "What is the result of multiplying the Echo Time by the Slice Thickness?",
          answers: [110096],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 2,
          link: "https://colab.research.google.com/drive/1RMTRGQasQHFVcaKyMPjEcRavAjkPK5bW?usp=sharing",
          question: "What is the index of the rotated slice?",
          answers: [12],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 3,
          link: "https://colab.research.google.com/drive/1RrfwTC2JyO8_d8Xcg5u0Sis_mqghkuxA?usp=sharing",
          question:
            "Answer the 4 questions in the notebook. \nWhat is the manifacturer of the CT Scanner? \nHow old is the patient? \nWhat is the sex of the patient? (Male, Female) \nDoes the patient involve a method for injected contrast enhancement? (Yes / No)",
          answers: ["Siemens", 60, "Male", "No"],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 4,
          link: "https://colab.research.google.com/drive/1Ax21I6qHiveoQfXowFJcbHVfnk8YKLN8?usp=sharing",
          question:
            "Answer the 3 questions in the notebook. \nWhich anatomical plane are the slices? (axial, coronal, sagittal) \nWhat is the approximate intensity value of soft tissue? Write only the option letter. A)-2000 HU, B)-1000 HU, C)0 HU, D)1000 HU, E)2000 HU \nWhat is the approximate intensity value of bone? Write only the option letter. A)-2000 HU, B)-1000 HU, C)0 HU, D)1000 HU, E)2000 HU",
          answers: ["Axial", "C", "D"],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 5,
          link: "https://colab.research.google.com/drive/1nPshNj3EQ_OaJPiqDRwRT6omqvxccaIa?usp=sharing",
          question:
            "What is the intensity threshold value? Write only the option letter. A)0, B)1, C)2, D)3",
          answers: ["C"],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 6,
          link: "https://colab.research.google.com/drive/1jgaNhvkWKNoUN_CaH4BIvyDTv1Jd26KD?usp=sharing",
          question:
            "What are the four anatomical parts that have increased metabolic activity? The order of the anatomical part in the answer: From top to bottom anatomical part of a human body.",
          answers: ["Brain", "Heart", "Liver", "Bladder"],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 7,
          link: "https://colab.research.google.com/drive/1QvX3-OxwDH9lWNUdXPPwrro4-7AT3wia?usp=sharing",
          question:
            "What is the approximate average pixel intensity of the histogram equalized image in XRay Quest 1?",
          answers: [[127, 129]],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 8,
          link: "https://colab.research.google.com/drive/1qukHR86BYztjJ5fsPUQNXBZttoiLSZXK?usp=sharing",
          question:
            "What is the approximate difference in pixel intensity between Gaussian Filtered Image and Mean Filtered Image obtained in XRAY QUest 2? Write only the option letter. A) 12 B) 14 C) 19 D) 22",
          answers: ["B"],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 9,
          link: "https://colab.research.google.com/drive/1H59bjMsRH2O7nUQYXBideJXwTPkvmdyK?usp=sharing",
          question:
            "What is the mean value of subtracting the original masked image from the sharpened edges image? Give the result as an int",
          answers: [22],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
      ];
      for (let i = 8; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [activities[i], activities[j]] = [activities[j], activities[i]];
      }

      setActivityList(activities);
    }
    setIsDataLoaded(true);
  }, [setActivityList]);

  if (!isDataLoaded) return <div />;

  return (
    <Wrapper>
      {numBingos > 0 && (
        <CongratsMessage>
          🎉 Congrats! You've completed {numBingos} lines! Remember to ask us
          for some secret letters. 🎉
        </CongratsMessage>
      )}
      <Container>
        {[0, 1, 2].map((row) => (
          <Row id={`row${row + 1}`}>
            {[0, 1, 2].map((col) => (
              <>
                <BingoSquare
                  idx={row * 3 + col}
                  setShowConfetti={setShowConfetti}
                />
                <Modal
                  idx={row * 3 + col}
                  setShowConfetti={setShowConfetti}
                  setNumBingos={setNumBingos}
                />
              </>
            ))}
          </Row>
        ))}
        {showConfetti && (
          <Confetti
            style={{
              width: "100vw",
              height: "100vh",
            }}
          />
        )}
      </Container>
    </Wrapper>
  );
}

export default BingoCard;
