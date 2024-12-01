import styled from "styled-components";
import { ActivitiesContext, ActivityElement } from "./ActivitiesProvider";
import { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import Confetti from "react-confetti";

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

const Wrapper = styled.div`
  flex-grow: 1; /* Allows this section to grow and center vertically */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -60px;
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
          link: "https://colab.research.google.com/drive/1o-x8y-CCmh-n3zaoEysJYOpjNjjWVlZu?usp=sharing",
          question:
            "Answer the 3 questions in the notebook. \nWhich anatomical plane are the slices? (axial, coronal, sagittal) \nWhat is the approximate intensity value of soft tissue? Write only the option letter. A)-2000 HU, B)-1000 HU, C)0 HU, D)1000 HU, E)2000 HU \nWhat is the approximate intensity value of bone? Write only the option letter. A)-2000 HU, B)-1000 HU, C)0 HU, D)1000 HU, E)2000 HU",
          answers: ["Axial", "C", "D"],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 5,
          link: "https://drive.google.com/file/d/1nPshNj3EQ_OaJPiqDRwRT6omqvxccaIa/view?usp=sharing",
          question:
            "What is the intensity threshold value? Write only the option letter. A)0, B)1, C)2, D)3",
          answers: ["C"],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 6,
          link: "https://drive.google.com/file/d/1jgaNhvkWKNoUN_CaH4BIvyDTv1Jd26KD/view?usp=sharing",
          question:
            "What are the four anatomical parts that have increased metabolic activity? The order of the anatomical part in the answer: From top to bottom anatomical part of a human body.",
          answers: ["Brain", "Heart", "Liver", "Bladder"],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 7,
          link: "https://drive.google.com/file/d/1QvX3-OxwDH9lWNUdXPPwrro4-7AT3wia/view?usp=drive_link",
          question:
            "What is the approximate average pixel intensity of the histogram equalized image in XRay Quest 1?",
          answers: [[127, 128, 129]],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 8,
          link: "https://drive.google.com/file/d/1qukHR86BYztjJ5fsPUQNXBZttoiLSZXK/view?usp=drive_link",
          question:
            "What is the approximate difference in pixel intensity between Gaussian Filtered Image and Mean Filtered Image obtained in XRAY QUest 2? Write only the option letter. A) 12 B) 15 C) 19 D) 22",
          answers: ["B"],
          completed: false,
          guessing: false,
          difficulty: 0,
        },
        {
          num: 9,
          link: "https://colab.research.google.com/drive/1H59bjMsRH2O7nUQYXBideJXwTPkvmdyK?usp=sharing",
          question:
            "What is the mean value of subtracting the sharpened edges image minus the original masked image? Give the result as an int",
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
      <Container>
        {[0, 1, 2].map((row) => (
          <Row id={`row${row + 1}`}>
            {[0, 1, 2].map((col) => (
              <>
                <BingoSquare
                  idx={row * 3 + col}
                  setShowConfetti={setShowConfetti}
                />
                <Modal idx={row * 3 + col} setShowConfetti={setShowConfetti} />
              </>
            ))}
          </Row>
        ))}
        {showConfetti && <Confetti />}
      </Container>
    </Wrapper>
  );
}

export default BingoCard;
