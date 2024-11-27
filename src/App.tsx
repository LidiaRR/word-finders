import styled from "styled-components";
import "./App.css";
import BingoCard from "./components/BingoCard";
import ActivitiesProvider from "./components/ActivitiesProvider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align content to the top first */
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 20px;
  background: linear-gradient(145deg, #0f2027, #203a43, #2c5364);
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
`;

// Styled Title Component
const Title = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  font-size: 3.5rem;
  color: #c0c0c0;
  margin-bottom: 0;
  text-align: center;
  /* font-family: "Montserrat", sans-serif; */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

function App() {
  return (
    <ActivitiesProvider>
      <div className="App">
        <header className="App-header">
          <Container>
            <Title>Word Finders</Title>
            <BingoCard />
          </Container>
        </header>
      </div>
    </ActivitiesProvider>
  );
}

export default App;
