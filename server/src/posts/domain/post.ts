import type { Prisma } from "@prisma/client";

import { FileExtension, ImageFile } from "@/types";
import { tags } from "typia";

export type PostProperties = Pick<
    Prisma.PostUncheckedCreateInput,
    "id" | "title" | "content" | "location" | "userId" | "createdAt"
> & {
    images: ImageFile[];
};

export class Post {
    private readonly title: string;
    private readonly content: string;
    private readonly location: string;
    private readonly userId: number;
    private readonly createdAt: Date;
    private readonly images: ImageFile[];

    constructor(properties: PostProperties) {
        Object.assign(this, properties);
    }
}
