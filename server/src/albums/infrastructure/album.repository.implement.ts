import { AlbumRepository } from "@/albums/domain/album.repository";
import { Prisma, PrismaClient } from "@prisma/client";
import { Inject, Injectable } from "@nestjs/common";

import type { Album, AlbumProperties } from "@/albums/domain/album";

@Injectable()
export class AlbumRepositoryImplement implements AlbumRepository {
    constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) {}

    async create(album: Album): Promise<void> {
        await this.prisma.album.create({
            data: this.mapToPersistence(album),
        });
    }

    private mapToPersistence(model: Album): Prisma.AlbumUncheckedCreateInput {
        const properties = JSON.parse(JSON.stringify(model)) as AlbumProperties;

        return properties;
    }
}
