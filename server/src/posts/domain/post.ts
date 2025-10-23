import type { Prisma } from "@prisma/client";

import { ImageFile } from "@/types";
import { User } from "@/users/domain/user";

export type PostProperties = Pick<
    Prisma.PostUncheckedCreateInput,
    "id" | "title" | "content" | "location" | "userId" | "createdAt"
> & {
    user?: Pick<User, "getEmail" | "getName">;
    images: ImageFile[];
};

export class Post {
    readonly id: number;
    readonly title: string;
    readonly content: string;
    readonly location: string;
    readonly userId: number;
    readonly createdAt: Date;
    readonly user?: Pick<User, "getEmail" | "getName">;
    readonly images: ImageFile[];

    constructor(properties: PostProperties) {
        Object.assign(this, properties);
    }
}
