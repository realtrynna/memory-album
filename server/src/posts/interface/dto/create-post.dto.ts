import { tags } from "typia";

export interface CreatePostDto {
    title: string & tags.MinLength<1> & tags.MaxLength<100>;
    content: string & tags.MinLength<1>;
    location: string;
}
