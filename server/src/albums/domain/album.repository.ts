import type { Album } from "@/albums/domain/album";

export interface AlbumRepository {
    create(album: Album): Promise<void>;
}
