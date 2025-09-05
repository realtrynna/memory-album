import { User } from "@/users/domain/user";

export interface UserRepository {
    create(user: User): Promise<User>;
    findUnique(email: string): Promise<User | null>;
}
