import type { Prisma } from "@prisma/client";

import type { MediaFile } from "@/types";

type PostProperties = Readonly<Prisma.PostUncheckedCreateInput>;

export class Post {
    private readonly title: string;
    private readonly content: string;
    private readonly location: string;
    private readonly file: MediaFile;
    private readonly userId: number;
    // private readonly albumId: number;

    constructor(properties: PostProperties) {
        Object.assign(this, properties);
    }
}
