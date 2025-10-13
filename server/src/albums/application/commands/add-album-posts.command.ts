import { ICommand } from "@nestjs/cqrs";

export class AddAlbumPostsCommand implements ICommand {
    constructor(
        readonly albumId: number,
        readonly postIds: Array<number>,
    ) {}
}
