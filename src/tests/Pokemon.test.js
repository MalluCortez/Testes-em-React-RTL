import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando o componente <Pokemon.js />', () => {
  test('Verifica se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonInfos = screen.getByText(/average weight: 6\.0 kg/i);
    const pokemonImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    const pokemonUrl = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonInfos).toBeInTheDocument();
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe(pokemonUrl);
  });

  test('Verifica o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemon/25');
  });

  test('Verifica se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const favoriteCheckBox = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoriteCheckBox);

    const favoritePokemon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(favoritePokemon).toBeInTheDocument();
    expect(favoritePokemon.src).toContain('/star-icon.svg');
  });
});
