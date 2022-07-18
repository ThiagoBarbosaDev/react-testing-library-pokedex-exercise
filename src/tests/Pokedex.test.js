import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const POKEMON_NAMES = pokemons.map((pkmn) => pkmn.name);

describe('Requisito 05 - Teste o componente Pokedex', () => {
  const nextButtonName = ({ name: 'Próximo pokémon' });
  it('deve conter um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexHeader = screen
      .getByRole('heading', { level: 2, name: /encountered pokémons/i });

    expect(pokedexHeader).toBeInTheDocument();
  });

  it(`deve ser exibido o próximo pokémon da lista quando o botão Próximo
   pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', nextButtonName);

    POKEMON_NAMES.forEach((pokemon) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });

  it('deve ser mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    POKEMON_NAMES.forEach(() => {
      const pokemonName = screen.getAllByTestId('pokemon-name');
      expect(pokemonName).toHaveLength(1);
      const pokemonType = screen.getAllByTestId('pokemon-type');
      expect(pokemonType).toHaveLength(1);
      const pokemonWeight = screen.getAllByTestId('pokemon-weight');
      expect(pokemonWeight).toHaveLength(1);
    });
  });

  it('deverá ter os botões de filtro', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const nextButton = screen.getByRole('button', nextButtonName);

    const typeButton = (pkmn) => screen.getByRole('button', { name: pkmn });
    const allTypeButtons = (pkmn) => screen.getAllByRole('button', { name: pkmn });

    const pokemonType = screen.getByTestId('pokemon-type');

    typeButtons.forEach(({ innerHTML: type }) => {
      const typeBtn = typeButton(type);
      const typeBtnArray = allTypeButtons(type);

      expect(typeBtn).toBeInTheDocument();
      expect(typeBtnArray).toHaveLength(1);

      userEvent.click(typeBtn);
      expect(pokemonType).toBeInTheDocument();

      if (!nextButton.disabled) {
        expect(pokemonType.innerHTML).toBe(type);
        userEvent.click(nextButton);
        expect(pokemonType.innerHTML).toBe(type);
      }
    });
  });

  it('deverá conter um botão para resetar o filtro sempre', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    expect(allButton).toBeInTheDocument();

    typeButtons.forEach((button) => {
      userEvent.click(button);
      expect(allButton).toBeInTheDocument();
    });
  });

  it('o botão para resetar deverá permitir a navegação entre todos os pokemons', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    const nextButton = screen.getByRole('button', nextButtonName);
    const pokemonName = screen.getByTestId('pokemon-name');

    userEvent.click(allButton);

    POKEMON_NAMES.forEach((pkmn) => {
      expect(pokemonName.innerHTML).toBe(pkmn);
      userEvent.click(nextButton);
    });
  });
});
