import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { NotFound } from '../pages';

describe('Requisito 04 - Teste o componente FavoritePokemons', () => {
  it('deve conter um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFoundHeader = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(notFoundHeader).toBeInTheDocument();
  });
  it('deve renderizar a imagem correta.', () => {
    renderWithRouter(<NotFound />);
    const imagemSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imagem = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(imagem.src).toBe(imagemSrc);
  });
});
