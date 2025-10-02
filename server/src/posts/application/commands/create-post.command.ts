import { ICommand } from "@nestjs/cqrs";

import type { MediaFile } from "@/types";

export class CreatePostCommand implements ICommand {
    constructor(
        readonly title: string,
        readonly content: string,
        readonly location: string,
        readonly userId: number,
        readonly images: MediaFile[],
    ) {}
}
