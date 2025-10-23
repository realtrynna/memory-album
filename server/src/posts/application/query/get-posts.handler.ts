import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { GetPostsQuery } from "@/posts/application/query/get-posts.query";
import { Inject } from "@nestjs/common";
import { InjectionToken } from "@/posts/application/injection-token";
import type { PostRepository } from "@/posts/domain/post.repository";
import { GetPostsResult } from "@/posts/application/query/get-posts.result";
import { Post } from "@/posts/domain/post";

@QueryHandler(GetPostsQuery)
export class GetPostsHandler
    implements IQueryHandler<GetPostsQuery, GetPostsResult[]>
{
    constructor(
        @Inject(InjectionToken.POST_REPOSITORY)
        private readonly postRepository: PostRepository,
    ) {}

    async execute(command: GetPostsQuery): Promise<GetPostsResult[]> {
        const startDate = new Date(command.startDate);
        const endDate = new Date(command.endDate);

        const posts = await this.postRepository.findMany(startDate, endDate);

        return posts.map((post) => GetPostsResult.from(post));
    }
}
