import type { Album } from "@/albums/domain/album";

export interface AlbumRepository {
    isAlbum(albumId: number): Promise<boolean>;
    create(album: Album): Promise<void>;
}
