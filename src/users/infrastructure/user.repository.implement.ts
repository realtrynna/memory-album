import { PrismaClient } from "@prisma/client";
import { Inject } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { UserRepository } from "@/users/domain/user.repository";
import { User, UserProperties } from "@/users/domain/user";
import { UserFactory } from "@/users/domain/user.factory";

export class UserRepositoryImplement implements UserRepository {
    constructor(
        @Inject(PrismaClient) private readonly prisma: PrismaClient,
        private readonly userFactory: UserFactory,
    ) {}

    // async findUnique(email: string): Promise<User | null> {
    //     const user = await this.prisma.user.findUnique({
    //         where: {
    //             email,
    //         },
    //     });
    //
    //     return this.userFactory.reconstitute(user);
    // }

    async create(user: User): Promise<User> {
        const created = await this.prisma.user.create({
            data: this.mapToPersistence(user),
        });

        return this.userFactory.reconstitute(created);
    }

    private mapToPersistence(model: User): Prisma.UserCreateInput {
        const properties = JSON.parse(JSON.stringify(model)) as UserProperties;

        return properties;
    }

    private entityToModel(entity) {}
}
