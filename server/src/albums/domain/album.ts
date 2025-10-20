import type { Prisma } from "@prisma/client";

import { Post } from "@/posts/domain/post";

export type AlbumProperties = Readonly<
    Prisma.AlbumUncheckedCreateInput & {
        posts?: Post[];
    }
>;

export class Album {
    readonly id: number;
    readonly userId: number;
    readonly title: string;
    readonly posts: Post[];

    constructor(propertis: AlbumProperties) {
        Object.assign(this, propertis);
    }
}
