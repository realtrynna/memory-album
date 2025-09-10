import { PrismaClient } from "@prisma/client";
import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { UserRepository } from "@/users/domain/user.repository";
import { User, UserProperties } from "@/users/domain/user";
import { UserFactory } from "@/users/domain/user.factory";

@Injectable()
export class UserRepositoryImplement implements UserRepository {
    constructor(
        @Inject(PrismaClient) private readonly prisma: PrismaClient,
        private readonly userFactory: UserFactory,
    ) {}

    async findUnique(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user ? this.entityToModel(user) : null;
    }

    async create(user: User): Promise<User> {
        const created = await this.prisma.user.create({
            data: this.mapToPersistence(user),
        });

        return this.userFactory.reconstitute(created);
    }

    async updateRefreshToken(
        email: string,
        refreshToken: string,
    ): Promise<void> {
        await this.prisma.user.update({
            where: {
                email,
            },
            data: {
                refreshToken,
            },
        });
    }

    private mapToPersistence(model: User): Prisma.UserCreateInput {
        const properties = JSON.parse(JSON.stringify(model)) as UserProperties;

        return properties;
    }

    private entityToModel(entity: Prisma.UserGetPayload<{ include?: any }>) {
        return this.userFactory.reconstitute({
            email: entity.email,
            name: entity.name,
            password: entity.password,
            phone: entity.phone,
            birthday: entity.birthday,
            provider: entity.provider,
            refreshToken: entity.refreshToken,
        });
    }
}
