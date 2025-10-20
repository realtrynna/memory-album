import { IQueryResult } from "@nestjs/cqrs";

import type { Album } from "@/albums/domain/album";
import type { Post } from "@/posts/domain/post";

export class GetAlbumDetailResult implements IQueryResult {
    constructor(
        readonly id: number,
        readonly userId: number,
        readonly title: string,
        readonly posts: Post[],
    ) {}

    static from(album: Album) {
        return new GetAlbumDetailResult(
            album.id,
            album.userId,
            album.title,
            album.posts,
        );
    }
}
