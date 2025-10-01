import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { PostController } from "@/posts/interface/post.controller";

@Module({
    controllers: [PostController],
    imports: [CqrsModule],
})
export class PostModule {}
