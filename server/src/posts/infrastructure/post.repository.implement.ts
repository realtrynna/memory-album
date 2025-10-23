import { Inject, Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

import { PostRepository } from "@/posts/domain/post.repository";
import { Post, PostProperties } from "@/posts/domain/post";
import { BaseRepository } from "@libs/prisma/base.repository";
import { User } from "@/users/domain/user";

@Injectable()
export class PostRepositoryImplement
    extends BaseRepository
    implements PostRepository
{
    constructor(@Inject(PrismaClient) readonly prisma: PrismaClient) {
        super(prisma);
    }

    async findUniqueByPostId(postId: number): Promise<Post | null> {
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                user: {
                    select: {
                        email: true,
                        name: true,
                    },
                },
                images: true,
                videos: true,
            },
        });

        return post ? this.entityToModel(post) : null;
    }

    async findMany(startDate: Date, endDate: Date): Promise<Post[]> {
        const client = this.getClient();

        const posts = await client.post.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            include: {
                user: {
                    select: {
                        email: true,
                        name: true,
                    },
                },
                images: true,
            },
        });

        return this.entitiesToModels(posts);
    }

    async create(post: Post): Promise<void> {
        await this.prisma.post.create({
            data: this.mapToPersistence(post),
        });
    }

    private mapToPersistence(model: Post): Prisma.PostUncheckedCreateInput {
        const properties = JSON.parse(JSON.stringify(model)) as PostProperties;
        const images = properties.images.map((image) => {
            return {
                filename: image.filename,
                savedFilename: image.savedFilename,
                extension: image.extension,
                size: image.size,
                path: image.path,
            };
        });

        return {
            ...properties,
            images: {
                create: images,
            },
        };
    }

    private entityToModel(
        entity: Prisma.PostGetPayload<{
            include: {
                user: {
                    select: {
                        email: true;
                        name: true;
                    };
                };
                images: true;
                videos: false;
            };
        }>,
    ): Post {
        const images = entity.images.map((image) => {
            return {
                filename: image.filename,
                savedFilename: image.savedFilename,
                extension: image.extension,
                size: image.size,
                path: image.path,
                createdAt: image.createdAt.toISOString(),
                updatedAt: image.updatedAt.toISOString(),
            };
        });

        return new Post({
            id: entity.id,
            title: entity.title,
            content: entity.content,
            location: entity.location,
            userId: entity.userId,
            createdAt: entity.createdAt,
            user: {
                getEmail: entity.user.email,
                getName: entity.user.name,
            },
            images,
        });
    }

    private entitiesToModels(
        entities: Prisma.PostGetPayload<{
            include: {
                user: {
                    select: {
                        email: true;
                        name: true;
                    };
                };
                images: true;
                videos: false;
            };
        }>[],
    ): Post[] {
        return entities.map((entity) => this.entityToModel(entity));
    }
}
