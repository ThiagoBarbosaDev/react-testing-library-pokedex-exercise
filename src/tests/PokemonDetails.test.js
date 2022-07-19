import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const POKEMON_DATA = pokemons;

describe('commit inicial', () => {
  it(`deve testar se as informações detalhadas do pokémon selecionado são mostradas
  na tela`, () => {
    renderWithRouter(<App />);

    const { name, summary } = POKEMON_DATA[0];

    const moreDetailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsButton);

    expect(moreDetailsButton).not.toBeInTheDocument();

    const { innerHTML: pkmnName } = screen
      .getByRole('heading', { level: 2, name: `${name} Details` });
    expect(pkmnName).toBe(`${name} Details`);

    const summaryHeader = screen
      .getByRole('heading', { level: 2, name: /Summary/i });
    expect(summaryHeader).toBeInTheDocument();

    const summaryText = screen.getByText(summary);
    expect(summaryText).toBeInTheDocument();

    const inputFavorite = screen.getByRole('checkbox');
    expect(inputFavorite.checked).toBe(false);
  });

  it(`Teste se existe na página uma seção com os mapas contendo as localizações
   do pokémon`, () => {
    renderWithRouter(<App />);

    const { name, foundAt: locations } = POKEMON_DATA[0];

    const moreDetailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsButton);

    const { innerHTML: mapsHeading } = screen
      .getByRole('heading', { level: 2, name: `Game Locations of ${name}` });
    expect(mapsHeading).toBe(`Game Locations of ${name}`);

    locations.forEach(({ location }) => {
      const renderedLocation = screen.getByText(location);
      expect(renderedLocation).toBeInTheDocument();
    });

    const renderedLocationMaps = screen.getAllByAltText(`${name} location`);

    renderedLocationMaps.forEach((renderedMap, index) => {
      expect(renderedMap.src).toBe(locations[index].map);
    });
  });

  it(`Teste se o usuário pode favoritar um pokémon através da página de
   detalhes`, () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsButton);

    const inputFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(inputFavorite).toBeInTheDocument();

    userEvent.click(inputFavorite);
    expect(inputFavorite.checked).toBe(true);
    userEvent.click(inputFavorite);
    expect(inputFavorite.checked).toBe(false);
  });
});
