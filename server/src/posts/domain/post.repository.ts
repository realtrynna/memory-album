import { Post } from "@/posts/domain/post";

export interface PostRepository {
    create(post: Post): Promise<void>;
}
