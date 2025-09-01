import { UserRepository } from "@/users/domain/user.repository";
import {User} from "@/users/domain/user.entity";

export class UserRepositoryImplement implements UserRepository {
    constructor(
    ) {
    }

    async create(user: User){
        // const created = await this.prisma.user.create({
        //
        // })
    }
}