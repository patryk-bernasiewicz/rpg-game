import { mock } from 'jest-mock-extended';
import { DataSource } from 'typeorm';

import { mockUserRepository } from './src/__mocks__/user.mock';

const mockDataSource = mock<DataSource>();
mockDataSource.getRepository.mockReturnValue(mockUserRepository);

jest.mock('typeorm', () => {
  const actualTypeorm = jest.requireActual('typeorm');

  return {
    ...actualTypeorm,
    DataSource: jest.fn(() => mockDataSource),
  };
});
