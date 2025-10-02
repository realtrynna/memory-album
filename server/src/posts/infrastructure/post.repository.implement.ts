import { Inject, Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

import { PostRepository } from "@/posts/domain/post.repository";
import { Post, PostProperties } from "@/posts/domain/post";

@Injectable()
export class PostRepositoryImplement implements PostRepository {
    constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) {}

    async create(post: Post) {
        console.log("persistence", this.mapToPersistence(post));
    }

    private mapToPersistence(model: Post): Prisma.PostUncheckedCreateInput {
        const properties = JSON.parse(JSON.stringify(model)) as PostProperties;

        return properties;
    }
}
