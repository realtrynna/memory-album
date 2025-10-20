import type { Album } from "@/albums/domain/album";
import type { PrismaClient } from "@prisma/client";

export interface AlbumRepository {
    findUniqueByAlbumId(
        albumId: number,
        tx?: PrismaClient,
    ): Promise<Album | null>;
    findMany(startDate: Date, endDate: Date): Promise<Album[] | []>;
    create(album: Album): Promise<void>;
    addAlbumPosts(albumId: number, postIds: Array<number>): Promise<void>;
    transaction<T>(cb: (tx: PrismaClient) => Promise<T>): Promise<T>;
}
