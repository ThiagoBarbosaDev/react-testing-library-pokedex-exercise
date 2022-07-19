import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('commit inicial', () => {
  it('commit inicial', () => {
    renderWithRouter(<App />);
  });
});
