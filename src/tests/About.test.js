import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../pages/About';

describe('testando o componente <About.js />', () => {
  test('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    // Acessar
    render(<About />);
    const titleAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(titleAbout).toBeInTheDocument();
  });
  test('Verifica se a página se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const firstParagraph = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const secondParagraph = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  test('Verifica se a página contém a  imagem de uma Pokédex', () => {
    render(<About />);
    const imgAttribute = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgAbout = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(imgAbout).toBeInTheDocument();
    expect(imgAbout.src).toEqual(imgAttribute);
  });
});
