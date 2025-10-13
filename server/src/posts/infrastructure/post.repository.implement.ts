import { Inject, Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

import { PostRepository } from "@/posts/domain/post.repository";
import { Post, PostProperties } from "@/posts/domain/post";

@Injectable()
export class PostRepositoryImplement implements PostRepository {
    constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) {}

    async create(post: Post): Promise<void> {
        await this.prisma.post.create({
            data: this.mapToPersistence(post),
        });
    }

    private mapToPersistence(model: Post): Prisma.PostUncheckedCreateInput {
        const properties = JSON.parse(JSON.stringify(model)) as PostProperties;

        return properties;
    }

    private async entityToModel(
        entity: Prisma.PostGetPayload<{
            include: any;
        }>,
    ) {
        return new Post({
            title: entity.title,
            content: entity.content,
            location: entity.location,
            userId: entity.userId,
            createdAt: entity.createdAt,
        });
    }
}
