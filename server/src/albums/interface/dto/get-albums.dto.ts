import { tags } from "typia";

export interface GetAlbumsDto {
    startDate: string & tags.MinLength<8> & tags.MaxLength<10>;
    endDate: string & tags.MinLength<8> & tags.MaxLength<10>;
}
