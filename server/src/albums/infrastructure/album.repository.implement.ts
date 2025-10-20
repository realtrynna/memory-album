import { PrismaClient, Prisma } from "@prisma/client";
import { Inject, Injectable } from "@nestjs/common";

import { AlbumRepository } from "@/albums/domain/album.repository";
import { Album, AlbumProperties } from "@/albums/domain/album";
import { BaseRepository } from "@libs/prisma/base.repository";
import { Post } from "@/posts/domain/post";

@Injectable()
export class AlbumRepositoryImplement
    extends BaseRepository
    implements AlbumRepository
{
    constructor(@Inject(PrismaClient) prisma: PrismaClient) {
        super(prisma);
    }

    async findUniqueByAlbumId(albumId: number): Promise<Album | null> {
        const client = this.getClient();

        const album = await client.album.findUnique({
            where: {
                id: albumId,
            },
            include: {
                posts: {
                    include: {
                        post: {
                            include: {
                                images: true,
                                videos: false,
                            },
                        },
                    },
                },
            },
        });

        return album ? this.entityToModel(album) : null;
    }

    async findMany(startDate: Date, endDate: Date): Promise<Album[] | []> {
        const client = this.getClient();

        const albums = await client.album.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            include: {
                posts: {
                    include: {
                        post: {
                            include: {
                                images: true,
                                videos: false,
                            },
                        },
                    },
                },
            },
        });

        return albums ? this.entitiesToModels(albums) : [];
    }

    async create(album: Album): Promise<void> {
        await this.prisma.album.create({
            data: this.mapToPersistence(album),
        });
    }

    async addAlbumPosts(
        albumId: number,
        postIds: Array<number>,
    ): Promise<void> {
        const client = this.getClient();

        const result = await client.postAlbums.createMany({
            data: postIds.map((postId) => {
                return {
                    albumId,
                    postId,
                };
            }),
            skipDuplicates: false,
        });
    }

    private mapToPersistence(model: Album): Prisma.AlbumUncheckedCreateInput {
        return JSON.parse(JSON.stringify(model)) as AlbumProperties;
    }

    private entityToModel(
        entity: Prisma.AlbumGetPayload<{
            include: {
                posts: {
                    include: {
                        post: {
                            include: {
                                images: true;
                                videos: false;
                            };
                        };
                    };
                };
            };
        }>,
    ) {
        const posts = entity.posts.map(({ postId, post }) => {
            const images = post.images.map((image) => ({
                filename: image.filename,
                savedFilename: image.savedFilename,
                extension: image.extension,
                size: image.size,
                path: image.path,
                createdAt: image.createdAt.toISOString(),
                updatedAt: image.updatedAt.toISOString(),
            }));

            return new Post({
                id: postId,
                title: post.title,
                content: post.content,
                location: post.location,
                userId: post.userId,
                createdAt: post.createdAt,
                images,
            });
        });

        return new Album({
            id: entity.id,
            userId: entity.userId,
            title: entity.title,
            posts,
        });
    }

    private entitiesToModels(
        entities: Prisma.AlbumGetPayload<{
            include: {
                posts: {
                    include: {
                        post: {
                            include: {
                                images: true;
                                videos: false;
                            };
                        };
                    };
                };
            };
        }>[],
    ) {
        return entities.map((entity) => this.entityToModel(entity));
    }
}
