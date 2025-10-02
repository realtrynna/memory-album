import type { Prisma } from "@prisma/client";

import type { MediaFile } from "@/types";

export type PostProperties = Readonly<Prisma.PostUncheckedCreateInput>;

export class Post {
    private readonly title: string;
    private readonly content: string;
    private readonly location: string;
    private readonly images: MediaFile[];
    private readonly userId: number;

    constructor(properties: PostProperties) {
        Object.assign(this, properties);
    }
}
