import { tags } from "typia";

export interface CreateAlbumDto {
    title: string & tags.MinLength<1>;
}
