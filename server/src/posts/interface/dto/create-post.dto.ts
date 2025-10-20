import { tags } from "typia";
import { ImageFile } from "@/types";

export interface CreatePostDto {
    title: string & tags.MinLength<1> & tags.MaxLength<100>;
    content: string & tags.MinLength<1>;
    location: string;
    imageList: ImageFile[];
}
