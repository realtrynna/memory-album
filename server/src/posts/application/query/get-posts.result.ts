import { IQueryResult } from "@nestjs/cqrs";

import { Post } from "@/posts/domain/post";
import { ImageFile } from "@/types";

export class GetPostsResult implements IQueryResult {
    constructor(
        readonly id: number,
        readonly title: string,
        readonly content: string,
        readonly location: string,
        readonly userId: number,
        readonly createdAt: string,
        readonly images: ImageFile[],
    ) {}

    static from(post: Post) {
        return new GetPostsResult(
            post.id,
            post.title,
            post.content,
            post.location,
            post.userId,
            post.createdAt.toLocaleString(),
            post.images,
        );
    }
}
