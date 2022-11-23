import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';

describe('testando o componente <FavoritePokemon.js />', () => {
  test('Verifica se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    // Acessar
    renderWithRouter(<FavoritePokemon />);
    const textNotFavorite = screen.getByText(/no favorite pokémon found/i);
    expect(textNotFavorite).toBeInTheDocument();
  });
});
