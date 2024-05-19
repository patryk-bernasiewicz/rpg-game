jest.mock('typeorm', () => {
    const actualTypeorm = jest.requireActual('typeorm');
  
    return {
      ...actualTypeorm,
      DataSource: jest.fn().mockImplementation(() => {
        return {
          initialize: jest.fn().mockResolvedValue(true),
          getRepository: jest.fn(),
          manager: {
            getRepository: jest.fn(),
          },
          destroy: jest.fn().mockResolvedValue(true),
        };
      }),
    };
  });