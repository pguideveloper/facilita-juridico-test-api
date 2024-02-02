import { describe, expect, it } from 'vitest';
import { calculateRoute } from './calculateRoute';

describe('Calculate Route Helper Function', () => {
  it('Should calculate the minimium route in a path correctly', () => {
    const mockRoute = [
      {
        id: 'any_id',
        name: 'company',
        email: 'company@mail.com',
        phone: '999999999',
        coordinates: { x: 0, y: 0 },
      },
      {
        id: 'any_id_2',
        name: 'Pedro Henrique Guimarães',
        email: 'pedro@gmail.com',
        phone: '(12) 9 8210-7404',
        coordinates: { x: 2, y: 3 },
      },
      {
        id: 'any_id_3',
        name: 'Lucca Alegri',
        email: 'lucca@gmail.com',
        phone: '(12) 9 8210-7404',
        coordinates: { x: 10, y: 2 },
      },
      {
        id: 'any_id_4',
        name: 'Isabelle Alegri',
        email: 'Isabelle@gmail.com',
        phone: '(12) 9 8210-7404',
        coordinates: { x: 5, y: 8 },
      },
    ];

    const expectedResult = [
      {
        id: 'any_id',
        name: 'company',
        email: 'company@mail.com',
        phone: '999999999',
        coordinates: { x: 0, y: 0 },
      },
      {
        id: 'any_id_2',
        name: 'Pedro Henrique Guimarães',
        email: 'pedro@gmail.com',
        phone: '(12) 9 8210-7404',
        coordinates: { x: 2, y: 3 },
      },
      {
        id: 'any_id_4',
        email: 'Isabelle@gmail.com',
        phone: '(12) 9 8210-7404',
        coordinates: { x: 5, y: 8 },
      },
      {
        id: 'any_id_3',
        name: 'Lucca Alegri',
        email: 'lucca@gmail.com',
        phone: '(12) 9 8210-7404',
        coordinates: { x: 10, y: 2 },
      },
      {
        id: 'any_id',
        name: 'company',
        email: 'company@mail.com',
        phone: '999999999',
        coordinates: { x: 0, y: 0 },
      },
    ];

    const result = calculateRoute(mockRoute);
    expect(result).toMatchObject(expectedResult);
  });
});
