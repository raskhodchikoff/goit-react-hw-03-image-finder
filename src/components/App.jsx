import { Component } from 'react';

// import { PropTypes } from 'prop-types';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { nanoid } from 'nanoid';
// import { Formik, ErrorMessage } from 'formik';
// import * as yup from 'yup';

import { Part } from 'components/Part/Part';

import { Example } from './App.styled';
import { Box } from './Box';

export class App extends Component {
  render() {
    return (
      <Box as="main" mx="auto">
        <Example />
        <Part />
      </Box>
    );
  }
}
