//import React from 'React';
// import userEvent from '@testing-library/user-event';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/react';

import Signup from '../src/client/routes/Signup';

describe('Unit testing React components', () => {
  describe('SignUp', () => {
    let text;

    beforeAll(() => {
      text = render(<Signup />);
    });

    afterEach(() => {
        cleanup();
    });

    test('Renders sign up', () => {
      expect(text.getByText('Get started with a free account')).toBeInTheDocument();
    });
  });
});
