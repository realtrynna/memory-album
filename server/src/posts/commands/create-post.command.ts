import { ICommand } from "@nestjs/cqrs";

import type { MediaFile } from "@/types";

export class CreatePostCommand implements ICommand {
    constructor(
        readonly title: string,
        readonly content: string,
        readonly location: string,
        readonly albumId: string,
        readonly file: MediaFile,
        readonly userId: number,
    ) {}
}
