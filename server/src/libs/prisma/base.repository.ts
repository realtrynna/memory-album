import type { PrismaClient } from "@prisma/client";

export abstract class BaseRepository {
    protected constructor(protected readonly prisma: PrismaClient) {}

    protected getClient(tx?: PrismaClient) {
        return tx ?? this.prisma;
    }

    async transaction<T>(cb: (tx: PrismaClient) => Promise<T>): Promise<T> {
        return this.prisma.$transaction(cb);
    }
}
