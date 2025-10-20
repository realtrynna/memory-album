import { Inject, Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

import { PostRepository } from "@/posts/domain/post.repository";
import { Post, PostProperties } from "@/posts/domain/post";

@Injectable()
export class PostRepositoryImplement implements PostRepository {
    constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) {}

    async findUniqueByPostId(postId: number): Promise<Post | null> {
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                images: true,
                videos: true,
            },
        });

        return post ? this.entityToModel(post) : null;
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
                images: true;
                videos: false;
            };
        }>,
    ) {
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
            title: entity.title,
            content: entity.content,
            location: entity.location,
            userId: entity.userId,
            createdAt: entity.createdAt?.toISOString(),
            images,
        });
    }
}
