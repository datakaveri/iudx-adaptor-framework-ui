import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  display: flex;
  width: ${props => props.width};
  flex-direction: row;
  justify-content: ${props => props.contentJustify};
  align-items: ${props => props.itemAlign};
`;

StyledDiv.propTypes = {
  itemAlign: PropTypes.string,
  contentJustify: PropTypes.string,
  width: PropTypes.string,
};

StyledDiv.defaultProps = {
  itemAlign: 'center',
  contentJustify: 'space-between',
  width: 'auto',
};

export default StyledDiv;
