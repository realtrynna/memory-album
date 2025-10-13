import typia, { tags } from "typia";

export interface AddAlbumPostsDto {
    postIds: Array<number & tags.Minimum<1>> & tags.MinItems<1>;
}
