import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }): Promise<User>;
    findAll(): Promise<User[]>;
}
