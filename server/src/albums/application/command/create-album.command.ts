import { ICommand } from "@nestjs/cqrs";

export class CreateAlbumCommand implements ICommand {
    constructor(
        readonly userId: number,
        readonly title: string,
    ) {}
}
