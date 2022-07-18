import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 01 - Teste o componente App', () => {
  it('deve contér um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const navHome = screen.getByRole('link', { name: /Home/i });
    const navAbout = screen.getByRole('link', { name: /About/i });
    const navFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(navHome).toBeInTheDocument();
    expect(navAbout).toBeInTheDocument();
    expect(navFavorite).toBeInTheDocument();
  });

  it('deve ser redirecionada para a página inicial ao clicar no link Home;', () => {
    const { history } = renderWithRouter(<App />);

    const navHome = screen.getByRole('link', { name: /Home/i });
    const navAbout = screen.getByRole('link', { name: /About/i });

    userEvent.click(navAbout);
    userEvent.click(navHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('deve ser redirecionada para a página About ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);

    const navAbout = screen.getByRole('link', { name: /About/i });

    userEvent.click(navAbout);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('deve ser redirecionada para a página Favorite Pokémons ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);

    const navFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(navFavorite);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('deve ser redirecionada para a página 404 entrar numa URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('404');

    const texto404 = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });

    expect(texto404).toBeInTheDocument();
  });
});
