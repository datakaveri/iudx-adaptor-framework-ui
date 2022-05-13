import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

const load = keyframes`
    from {
        transform: rotate(0deg) scale(2);
    }
    to {
        transform: rotate(360deg) scale(2);
    }
`;

const loaded = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  position: fixed;
  background: #ffffff;
  z-index: 1000;

  ${({ active }) =>
    active &&
    css`
      animation: ease ${loaded} 0.5s;
    `}
`;

const LoadIcon = styled.svg`
  margin: auto;
  width: 32px;
  height: 32px;
  animation: linear ${load} 2s infinite;
`;

const LoadIconWrapper = styled.div`
  margin: auto;
`;

const Loading = ({ loading }) => (
  <Wrapper active={loading}>
    <LoadIconWrapper>
      <LoadIcon>
        <path fill="#4c5be1" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
      </LoadIcon>
    </LoadIconWrapper>
  </Wrapper>
);

Loading.propTypes = {
  loading: PropTypes.bool,
};

Loading.defaultProps = {
  loading: false,
};

export default Loading;
