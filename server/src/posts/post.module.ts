import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { PostController } from "@/posts/interface/post.controller";
import { CreatePostHandler } from "@/posts/application/command/create-post.handler";
import { InjectionToken } from "@/posts/application/injection-token";
import { PostRepositoryImplement } from "@/posts/infrastructure/post.repository.implement";
import { GetPostsHandler } from "@/posts/application/query/get-posts.handler";

const application = [CreatePostHandler, GetPostsHandler];
const infrastructure = [
    {
        provide: InjectionToken.POST_REPOSITORY,
        useClass: PostRepositoryImplement,
    },
];

@Module({
    controllers: [PostController],
    imports: [CqrsModule],
    providers: [...application, ...infrastructure],
})
export class PostModule {}
