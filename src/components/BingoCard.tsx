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

    // const { isBingoIdx, bingoSquares } = isBingo({ idx, activityList });
    // if (isBingoIdx) {
    //   setShowConfetti(true);

    //   // Stop confetti after 30 seconds
    //   setTimeout(() => {
    //     setShowConfetti(false);
    //   }, 30000); // 30 seconds
    // }
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
    let activities: ActivityElement[] = [
      {
        num: 1,
        link: "https://colab.research.google.com/drive/1o-x8y-CCmh-n3zaoEysJYOpjNjjWVlZu?usp=sharing",
        question:
          "What is the result of multiplying the Echo Time by the Slice Thickness?",
        answer: "110.096",
        completed: false,
        guessing: false,
        difficulty: 0,
      },
      {
        num: 2,
        link: "https://colab.research.google.com/drive/1RMTRGQasQHFVcaKyMPjEcRavAjkPK5bW?usp=sharing",
        question: "What is the index of the rotated slice?",
        answer: "12",
        completed: false,
        guessing: false,
        difficulty: 0,
      },
      {
        num: 3,
        link: "https://colab.research.google.com/drive/1o-x8y-CCmh-n3zaoEysJYOpjNjjWVlZu?usp=sharing",
        question:
          "What is the result of multiplying the Echo Time by the Slice Thickness?",
        answer: "1",
        completed: false,
        guessing: false,
        difficulty: 0,
      },
      {
        num: 4,
        link: "https://colab.research.google.com/drive/1o-x8y-CCmh-n3zaoEysJYOpjNjjWVlZu?usp=sharing",
        question:
          "What is the result of multiplying the Echo Time by the Slice Thickness?",
        answer: "1",
        completed: false,
        guessing: false,
        difficulty: 0,
      },
      {
        num: 5,
        link: "https://colab.research.google.com/drive/1o-x8y-CCmh-n3zaoEysJYOpjNjjWVlZu?usp=sharing",
        question:
          "What is the result of multiplying the Echo Time by the Slice Thickness?",
        answer: "110.096",
        completed: false,
        guessing: false,
        difficulty: 0,
      },
      {
        num: 6,
        link: "https://colab.research.google.com/drive/1o-x8y-CCmh-n3zaoEysJYOpjNjjWVlZu?usp=sharing",
        question:
          "What is the result of multiplying the Echo Time by the Slice Thickness?",
        answer: "110.096",
        completed: false,
        guessing: false,
        difficulty: 0,
      },
      {
        num: 7,
        link: "https://colab.research.google.com/drive/1o-x8y-CCmh-n3zaoEysJYOpjNjjWVlZu?usp=sharing",
        question:
          "What is the result of multiplying the Echo Time by the Slice Thickness?",
        answer: "110.096",
        completed: false,
        guessing: false,
        difficulty: 0,
      },
      {
        num: 8,
        link: "https://colab.research.google.com/drive/1o-x8y-CCmh-n3zaoEysJYOpjNjjWVlZu?usp=sharing",
        question:
          "What is the result of multiplying the Echo Time by the Slice Thickness?",
        answer: "110.096",
        completed: false,
        guessing: false,
        difficulty: 0,
      },
      {
        num: 9,
        link: "https://colab.research.google.com/drive/1o-x8y-CCmh-n3zaoEysJYOpjNjjWVlZu?usp=sharing",
        question:
          "What is the result of multiplying the Echo Time by the Slice Thickness?",
        answer: "110.096",
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
