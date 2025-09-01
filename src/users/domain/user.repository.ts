import { User } from "@/users/domain/user.entity";

/**
 * 구현체는 알지만 실제 db 로직은 몰라야함
 */
export interface UserRepository {
    create: (user: User) => Promise<void>;
}