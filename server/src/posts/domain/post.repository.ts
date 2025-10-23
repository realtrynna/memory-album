import type { Post } from "@/posts/domain/post";

export interface PostRepository {
    findUniqueByPostId(postId: number): Promise<Post | null>;
    findMany(startDate: Date, endDate: Date): Promise<Post[] | []>;
    create(post: Post): Promise<void>;
}
