import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';

import { User } from '../entity/User';

// Eksport mocków do użycia w testach
export const mockUserRepository = mock<Repository<User>>();
