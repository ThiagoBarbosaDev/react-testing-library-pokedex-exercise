import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import { FavoritePokemons } from '../pages';
import App from '../App';

describe('Requisito 03 - Teste o componente FavoritePokemons', () => {
  it('exibe "No favorite pokemon found", se a pessoa não tem pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
  it('deverá exibir todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsButton);

    const favoriteCheckbox = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favoriteCheckbox);

    const navFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(navFavorite);

    const pokemonSprite = screen.getByAltText(/Pikachu sprite/i);
    expect(pokemonSprite).toBeInTheDocument();
  });
});
