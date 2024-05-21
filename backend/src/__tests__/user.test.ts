import { DataSource, type DataSourceOptions, type Repository } from "typeorm";
import { User } from "../entity/User";

describe('User entity', () => {
    let dataSource: DataSource;
    let userRepository: jest.Mocked<Repository<User>>;

    beforeAll(async () => {
        userRepository = {
            save: jest.fn(),
            find: jest.fn(),
        } as unknown as jest.Mocked<Repository<User>>;

        dataSource = new DataSource({} as DataSourceOptions);
        (dataSource.getRepository as jest.Mock).mockReturnValue(userRepository);
    });

    it('should create a new user', async () => {
        const user = new User();
        user.username = 'testuser';
        user.password = 'testpassword';

        userRepository.save.mockResolvedValue(user);

        const savedUser = await userRepository.save(user);

        expect(savedUser).toBeDefined();
        expect(savedUser.username).toBe('testuser');
    });

    it('encrypts user password', async () => {
        const user = new User();
        user.username = 'testuser';
        user.password = 'testpassword';

        await user.hashPassword();
        
        expect(user.password).toMatch(/\$2b\$10\$[A-Za-z0-9\\.]+/);
    });
});