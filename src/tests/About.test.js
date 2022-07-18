import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { About } from '../pages';

describe('Requisito 02 - Teste o componente About', () => {
  it('deve conter um heading h2 com o texto About Pokédex;', () => {
    renderWithRouter(<About />);

    const headerAbout = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(headerAbout).toBeInTheDocument();
  });
  it('deve conter dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type,/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('deve renderizar a imagem corretamente', () => {
    renderWithRouter(<About />);

    const image = screen.getByAltText(/Pokédex/i);
    const imagehref = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image.src).toBe(imagehref);
    expect(image).toBeInTheDocument();
  });
});
