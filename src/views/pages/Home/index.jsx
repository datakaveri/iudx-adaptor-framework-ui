import React, { useContext } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Footer from './Components/Footer';
import AuthApi from '../../../utilities/AuthApi';

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
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 55%;
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
  cursor: pointer;

  &:hover {
    background: #002a55;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const Auth = useContext(AuthApi);

  const logoutMethod = () => {
    Auth.setAuth(false);
    Cookies.remove('user');
    Cookies.remove('password');
  };

  return (
    <div>
      <Helmet>
        <title>IUDX Adaptor Framework</title>
      </Helmet>

      <Banner>
        <Text>
          <h2>IUDX Adaptor Framework</h2>
          <p>
            A generic and pluggable data ingestion utility based on Apache
            Flink.
          </p>
          <h2>Features</h2>
          <p>
            <ul>
              <li>Based on Apache Flink</li>
              <li>Configuration file based specification of the pipeline</li>
              <li>Pluggable for extending capabilities</li>
              <li>
                JSON Path based parsing and key extraction for watermarking
              </li>
              <li>Jolt based Json-Json transformation</li>
              <li>Quartz based job scheduling</li>

              <li>
                Vert x based Api server with config based pipeline JAR
                generation, user and adaptor job management and monitoring
              </li>
              <li>Docker development and deployment</li>
            </ul>
          </p>
          {Auth.auth ? (
            <FlatButton onClick={logoutMethod} type="button">
              Logout
            </FlatButton>
          ) : (
            <FlatButton
              onClick={() => {
                navigate('/login');
              }}
              type="button">
              Login
            </FlatButton>
          )}
        </Text>
        <Image>
          <Img src="/Overview.png" alt="Overview" />
          <Img src="/Components.png" alt="Components" />
        </Image>
      </Banner>

      <Footer />
    </div>
  );
};

export default Home;
