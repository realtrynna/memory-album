import { ResponseMeta } from "@libs/response-wrap";
import type { ImageFile } from "@/types";
import type { Album } from "@/albums/domain/album";

export const NODE_ENV = (process.env.NODE_ENV ?? "development").trim();

export enum ResponseStatus {
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    ALBUM_CREATE_SUCCESS = "ALBUM_CREATE_SUCCESS",
    MEDIA_FILE_UPLOAD_SUCCESS = "MEDIA_FILE_UPLOAD_SUCCESS",
    POST_CREATE_SUCCESS = "POST_CREATE_SUCCESS",
    ADD_ALBUM_POSTS_SUCCESS = "ADD_ALBUM_POSTS_SUCCESS",
    GET_ALBUM_DETAIL_SUCCESS = "GET_ALBUM_DETAIL_SUCCESS",
    GET_ALBUMS_SUCCESS = "GET_ALBUMS_SUCCESS",
}

interface ResponseDataMap {
    [ResponseStatus.LOGIN_SUCCESS]: {
        email: string;
        accessToken: string;
        refreshToken: string;
    };
    [ResponseStatus.ALBUM_CREATE_SUCCESS]: null;
    [ResponseStatus.MEDIA_FILE_UPLOAD_SUCCESS]: ImageFile;
    [ResponseStatus.POST_CREATE_SUCCESS]: null;
    [ResponseStatus.ADD_ALBUM_POSTS_SUCCESS]: null;
    [ResponseStatus.GET_ALBUM_DETAIL_SUCCESS]: Album;
    [ResponseStatus.GET_ALBUMS_SUCCESS]: Album[];
}

export const ResponseMap: {
    [k in keyof ResponseDataMap]: ResponseMeta<ResponseDataMap[k]>;
} = {
    [ResponseStatus.LOGIN_SUCCESS]: {
        message: "로그인에 성공하였습니다.",
        data: null,
    },
    [ResponseStatus.ALBUM_CREATE_SUCCESS]: {
        message: "앨범 생성에 성공하였습니다.",
        data: null,
    },
    [ResponseStatus.MEDIA_FILE_UPLOAD_SUCCESS]: {
        message: "미디어 파일 업로드에 성공하였습니다.",
        data: null,
    },
    [ResponseStatus.POST_CREATE_SUCCESS]: {
        message: "게시글 생성에 성공하였습니다.",
        data: null,
    },
    [ResponseStatus.ADD_ALBUM_POSTS_SUCCESS]: {
        message: "게시글이 앨범에 정상적으로 추가되었습니다.",
        data: null,
    },
    [ResponseStatus.GET_ALBUM_DETAIL_SUCCESS]: {
        message: "앨범 상세 조회에 성공하였습니다.",
        data: null,
    },
    [ResponseStatus.GET_ALBUMS_SUCCESS]: {
        message: "앨범 전체 조회에 성공하였습니다.",
        data: null,
    },
};
