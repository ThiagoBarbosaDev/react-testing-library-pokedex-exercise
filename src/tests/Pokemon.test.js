import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const POKEMON_DATA = pokemons;

describe('Requisito 06 - Teste o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon:', () => {
    renderWithRouter(<App />);
    const moreDetailsButton = screen.getByRole('link', { name: /More details/i });

    userEvent.click(moreDetailsButton);

    const { name: dataPkmnName, image,
      type: dataPkmnType, averageWeight: { value, measurementUnit } } = POKEMON_DATA[0];

    const { innerHTML: testIdPkmnName } = screen.getByTestId('pokemon-name');
    expect(testIdPkmnName).toBe(dataPkmnName);

    const { innerHTML: testIdPkmnType } = screen.getByTestId('pokemon-type');
    expect(testIdPkmnType).toBe(dataPkmnType);

    const { innerHTML: testIdPkmnWeight } = screen.getByTestId('pokemon-weight');
    expect(testIdPkmnWeight).toBe(`Average weight: ${value} ${measurementUnit}`);

    const pkmnSprite = screen.getByAltText(`${dataPkmnName} sprite`);
    expect(pkmnSprite.src).toBe(`${image}`);
  });

  it(`Teste se o card do pokémon indicado na Pokédex contém um link de navegação para 
  exibir detalhes deste pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsButton = screen.getByRole('link', { name: /More details/i });

    expect(moreDetailsButton).toBeInTheDocument();
    userEvent.click(moreDetailsButton);

    const details = screen.getByRole('heading', { level: 2, name: /details/i });
    expect(details).toBeInTheDocument();

    const { location: { pathname } } = history;
    const lastArrayIndex = -1;
    const idFromUrl = pathname.split('/').slice(lastArrayIndex)[0];

    const { id } = POKEMON_DATA[0];

    expect(+idFromUrl).toBe(id);
  });

  it('deve existir um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetailsButton = screen.getByRole('link', { name: /More details/i });

    userEvent.click(moreDetailsButton);

    const checkboxFavorite = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(checkboxFavorite);

    const starIcon = screen.getByAltText(/Pikachu is marked as favorite/i);

    expect(starIcon).toBeInTheDocument();

    const url = window.location.href;
    expect(starIcon.src).toBe(`${url}star-icon.svg`);
  });
});
