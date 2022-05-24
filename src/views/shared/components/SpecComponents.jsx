import styled from 'styled-components';

export const ColoredButton = styled.button`
  background-color: ${props => (props.solid ? 'rgb(31,31,31)' : 'white')};
  color: ${props => (props.solid ? 'white' : 'rgb(31,31,31)')};
  border-radius: 5px;
  border: 2px solid rgb(31, 31, 31);
  margin-right: 20px;
  height: 30px;
  padding: 0px 30px;
  margin-top: 20px;
  &:hover {
    background-color: rgb(96, 96, 96);
    color: ${props => (props.solid ? 'rgb(31,31,31)' : 'white')};
  }
`;

export const InputSpecScheduleJobDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  &:p {
    margin-right: 200px;
  }
`;

export const Line = styled.hr`
  height: 3px;
  color: rgb(29, 29, 29);
  background-color: rgb(29, 29, 29);
`;

export const Title = styled.h1`
  color: rgb(29, 29, 29);
  padding: 0px;
  margin: 0px;
`;
