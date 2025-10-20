import type { Post } from "@/posts/domain/post";

export interface PostRepository {
    findUniqueByPostId(postId: number): Promise<Post | null>;
    create(post: Post): Promise<void>;
}
