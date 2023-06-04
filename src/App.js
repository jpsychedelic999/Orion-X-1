import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useTransition, animated, config } from "react-spring";
import { v4 as uuidv4 } from "uuid";
import logo from "./images/logo.png"; // Import your logo

const generatePastelColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let pastel = `hsl(${hue}, 100%, 85%)`;
  return pastel;
};

const randomSize = () => {
  let sizes = [20, 30, 40, 50];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

const randomPosition = () => {
  let randomX = `${Math.random() * 100}%`;
  let randomY = `${Math.random() * 100}%`;
  return { left: randomX, top: randomY };
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Genos', sans-serif;
    color: white;
    background: black;
    margin: 0;
    padding: 0;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 100vh; // Using min-height instead of height to allow for scrolling
  text-align: center;
  color: white;
  padding: 1em;
  z-index: 1;
`;

const Logo = styled.img`
  width: 50%; // Adjust this value to change the size of the logo
  height: auto;
  display: block;
`;

const CompanyDescription = styled.p`
  margin: 20px auto;
  max-width: 600px; // Adjust this to control the paragraph width
  line-height: 1.5; // Adjust this to control the line spacing
  font-size: 16px; // Adjust this to control the font size
  color: white; // Adjust this to control the text color
`;

const EmailForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmailInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 200px;
  border: none;
  border-radius: 5px;
`;

const CommentBox = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  width: 200px;
  height: 100px;
  border: none;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background: none;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  border-radius: 5px;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 30px;
`;

function App() {
  const [circles, setCircles] = useState([]);
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoopCount((prevCount) => prevCount + 1);

      let circle = {
        id: uuidv4(),
        color: generatePastelColor(),
        size: randomSize(),
        position: randomPosition(),
        lifespan: Date.now() + 15500
      };

      setCircles((prevCircles) => [...prevCircles, circle]);

      if (loopCount >= 4) {
        clearInterval(timer);
      }
    }, 750);

    const removalTimer = setInterval(() => {
      setCircles((prevCircles) =>
        prevCircles.filter((circle) => circle.lifespan > Date.now())
      );
    }, 100);

    return () => {
      clearInterval(timer);
      clearInterval(removalTimer);
    };
  }, [loopCount]);

  const transitions = useTransition(circles, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    keys: circles.map((circle, index) => circle.id),
    config: { duration: 500 }
  });

  return (
    <>
      <GlobalStyle />
      {transitions((style, circle) => (
        <animated.div
          style={{
            ...style,
            ...circle.position,
            width: circle.size,
            height: circle.size,
            background: circle.color,
            borderRadius: "50%",
            position: "absolute",
            zIndex: 0,
            filter: "blur(10px)"
          }}
        />
      ))}
      <AppWrapper>
        <Logo src={logo} alt="Orion X-1 Technologies" />
        <CompanyDescription>
          Orion X-1 Technologies is the intersection of innovation, ambition,
          and the web3 revolution. Our pledge to 'Reach New Horizons' reflects
          in everything we do, from crafting groundbreaking applications to
          designing industry-leading hardware, all while pioneering in the web3
          domain. We don't just anticipate the future; we are the architects
          actively shaping it.
        </CompanyDescription>
        <EmailForm>
          <EmailInput type="email" placeholder="Your email address" />
          <CommentBox placeholder="Please reach out to us!" />
          <SubmitButton type="submit">Submit</SubmitButton>
        </EmailForm>
        <Footer>
          <p>Coming Soon!</p>
        </Footer>
      </AppWrapper>
    </>
  );
}

export default App;
