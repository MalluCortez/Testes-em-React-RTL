import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando o componente <App.js />', () => {
  describe('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    test('Verifica se o primeiro Link possui o texto Home', () => {
      renderWithRouter(<App />);
      const LinkHomeEl = screen.getByRole('link', {
        name: /home/i,
      });
      expect(LinkHomeEl).toBeInTheDocument();
    });
    test('Verifica se o segundo Link possui o texto About', () => {
      renderWithRouter(<App />);
      const LinkAboutEl = screen.getByRole('link', {
        name: /about/i,
      });
      expect(LinkAboutEl).toBeInTheDocument();
    });
    test('Verifica se o terceiro Link possui o texto Favorite Pokémon', () => {
      renderWithRouter(<App />);
      const LinkFavoriteEl = screen.getByRole('link', {
        name: /favorite pokémon/i,
      });
      expect(LinkFavoriteEl).toBeInTheDocument();
    });
  });

  describe('Verifica se as aplicações estão sendo redirecionadas corrtamente', () => {
    test('Verifica se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
      const { history, getByRole } = renderWithRouter(<App />);
      const homeButton = getByRole('link', {
        name: /home/i,
      });
      userEvent.click(homeButton);
      expect(history.location.pathname).toBe('/');
    });
    test('Verifica se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
      const { history, getByRole } = renderWithRouter(<App />);
      const aboutButton = getByRole('link', {
        name: /about/i,
      });
      userEvent.click(aboutButton);
      expect(history.location.pathname).toBe('/about');
    });
    test('é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
      const { history, getByRole } = renderWithRouter(<App />);
      const favoriteButton = getByRole('link', {
        name: /favorite pokémon/i,
      });
      userEvent.click(favoriteButton);
      expect(history.location.pathname).toBe('/favorites');
    });
    test('Verifica se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
      const { history } = renderWithRouter(<App />);
      act(() => history.push('/maria'));
      const textNotFound = screen.getByRole('heading', {
        name: /page requested not found/i,
      });
      expect(textNotFound).toBeInTheDocument();
    });
  });
});
