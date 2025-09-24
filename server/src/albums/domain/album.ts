import type { Prisma } from "@prisma/client";

export type AlbumProperties = Readonly<Prisma.AlbumUncheckedCreateInput>;

export class Album {
    private readonly userId: number;
    private readonly title: string;

    constructor(propertis: AlbumProperties) {
        Object.assign(this, propertis);
    }
}
