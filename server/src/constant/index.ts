import { ResponseMeta } from "@libs/response-wrap";
import { MediaFile } from "@/types";

export const NODE_ENV = (process.env.NODE_ENV ?? "development").trim();

export enum ResponseStatus {
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    ALBUM_CREATE_SUCCESS = "ALBUM_CREATE_SUCCESS",
    MEDIA_FILE_UPLOAD_SUCCESS = "MEDIA_FILE_UPLOAD_SUCCESS",
    POST_CREATE_SUCCESS = "POST_CREATE_SUCCESS",
}

interface ResponseDataMap {
    [ResponseStatus.LOGIN_SUCCESS]: {
        email: string;
        accessToken: string;
        refreshToken: string;
    };
    [ResponseStatus.ALBUM_CREATE_SUCCESS]: null;
    [ResponseStatus.MEDIA_FILE_UPLOAD_SUCCESS]: MediaFile;
    [ResponseStatus.POST_CREATE_SUCCESS]: null;
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
};
