import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Footer from './Components/Footer';

const Banner = styled.div`
  position: relative;
  background-color: #f2f2f2;
  margin: 0 30px;
  padding: 60px;
  overflow: hidden;
  border-radius: 6px;
  display: flex;
  height: calc(100vh - 100px);
  align-items: center;
  justify-content: space-between;
`;
const Image = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 70%;
`;

const Text = styled.div`
  width: 40%;
`;

const FlatButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  transition: 0.4s;
  background: #0b457f;
  border-radius: 5px;
  border-color: #002a55;
  padding: 20px 60px;
  color: white;
  border: 2px solid;

  &:hover {
    background: #002a55;
  }
`;

const Home = () => (
  <div>
    <Helmet>
      <title>IUDX Adaptor Framework</title>
    </Helmet>

    <Banner>
      <Text>
        <h2>Try out IUDX datasets in our Sandbox</h2>
        <p>
          IUDX offers a no-setup, customizable, Jupyter Notebooks environment.
          Access free GPUs and a huge repository of community published data &
          code.
        </p>
        <FlatButton type="button">Login /Register</FlatButton>
      </Text>
      <Image>
          <Img src="/Overview.png" alt="Overview" />
          <Img src="/Components.png" alt="Components" />
      </Image>
    </Banner>

    <Footer />
  </div>
);

export default Home;
