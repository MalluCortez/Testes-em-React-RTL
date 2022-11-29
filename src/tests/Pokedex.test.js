import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemonList from '../data';

const isPokemonFavoriteById = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('testando o componente <Pokedex.js />', () => {
  test('Verifica se a página contém um h2 com o texto `Encountered Pokémon` ', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const titlePokedex = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });
    expect(titlePokedex).toBeInTheDocument();
  });

  describe('Verifica se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    test('Verifica se o botão deve contém o texto `Próximo Pokémon` ', () => {
      renderWithRouter(<Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const buttonNextPokemon = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      userEvent.click(buttonNextPokemon);
      const pokemonCharmanderText = screen.getByText(/charmander/i);
      const pokemonCharmanderImg = screen.getByRole('img', {
        name: /charmander sprite/i,
      });
      expect(pokemonCharmanderText).toBeInTheDocument();
      expect(pokemonCharmanderImg).toBeInTheDocument();
    });

    test('Verifica se é mostrado apenas um Pokémon por vez', () => {
      renderWithRouter(<Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      const pokemonPikachutext = screen.getByText(/pikachu/i);
      const pokemonPikachuImg = screen.getByRole('img', {
        name: /pikachu sprite/i,
      });

      expect(pokemonPikachutext).toBeInTheDocument();
      expect(pokemonPikachuImg).toBeInTheDocument();

      const buttonNextPokemon = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      userEvent.click(buttonNextPokemon);

      const pokemonCharmanderText = screen.getByText(/charmander/i);
      const pokemonCharmanderImg = screen.getByRole('img', {
        name: /charmander sprite/i,
      });

      expect(pokemonCharmanderText).toBeInTheDocument();
      expect(pokemonCharmanderImg).toBeInTheDocument();
    });

    test('Verifica se existi um botão de filtragem para cada tipo de Pokémon, sem repetição ', () => {
      renderWithRouter(<Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      const allButtonsFilters = screen.getAllByTestId(/pokemon-type-button/i);
      allButtonsFilters.forEach((button) => {
        expect(button).toBeInTheDocument();
      });

      const buttonAll = screen.getByRole('button', {
        name: /all/i,
      });
      const buttonElectric = screen.getByRole('button', {
        name: /electric/i,
      });

      expect(buttonAll).toBeInTheDocument();
      userEvent.click(buttonElectric);

      const pokemonPikachutext = screen.getByText(/pikachu/i);
      const pokemonPikachuImg = screen.getByRole('img', {
        name: /pikachu sprite/i,
      });

      expect(pokemonPikachutext).toBeInTheDocument();
      expect(pokemonPikachuImg).toBeInTheDocument();
      expect(buttonAll).toBeInTheDocument();
    });
    test('Verifica se o texto do botão All e se está sempre visível ', () => {
      renderWithRouter(<Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      const buttonAll = screen.getByRole('button', {
        name: /all/i,
      });
      expect(buttonAll).toBeInTheDocument();
    });
  });
});
