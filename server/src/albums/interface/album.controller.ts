import { Controller, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { TypedBody, TypedRoute } from "@nestia/core";
import type { CreateAlbumDto } from "@/albums/interface/dto/create-album.dto";
import { CreateAlbumCommand } from "@/albums/application/commands/create-album.command";
import { JwtAuthGuard } from "@libs/guards/jwt-auth.guard";
import type { RequestUser } from "@/types";

@ApiTags("앨범")
@Controller("albums")
@UseGuards(JwtAuthGuard)
export class AlbumController {
    constructor(readonly commandBus: CommandBus) {}

    @TypedRoute.Post()
    async createAlbum(
        @TypedBody() createAlbumDto: CreateAlbumDto,
        @Req() req: RequestUser,
    ) {
        const command = new CreateAlbumCommand(
            req.user.id,
            createAlbumDto.title,
        );

        await this.commandBus.execute(command);
    }
}
