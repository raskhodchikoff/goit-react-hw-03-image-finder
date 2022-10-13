import { PropTypes } from 'prop-types';
import { Box } from './../Box';
import { Btn } from 'components/Button/Button.styled';

export const Button = ({ onClick }) => {
  return (
    <Box textAlign="center" mt={10}>
      <Btn type="button" onClick={onClick}>
        Load more
      </Btn>
    </Box>
  );
};

Button.propType = {
  onClick: PropTypes.func.isRequired,
};
