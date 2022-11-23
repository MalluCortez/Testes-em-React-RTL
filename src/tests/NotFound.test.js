import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('testando o componente <NotFound.js />', () => {
  test('Verifica se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const titleNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(titleNotFound).toBeInTheDocument();
  });
  test('Verifica se a página contém uma imagem com o com o src `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    // Acessar
    renderWithRouter(<NotFound />);
    const srcImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound.src).toEqual(srcImage);
  });
});
