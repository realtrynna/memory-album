import { User } from "@/users/domain/user";

export interface UserRepository {
    findUnique(email: string): Promise<User | null>;
    create(user: User): Promise<User>;
    updateRefreshToken(email: string, refreshToken: string): Promise<void>;
}
