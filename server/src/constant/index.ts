import { ResponseMeta } from "@libs/response-wrap";

export const NODE_ENV = (process.env.NODE_ENV ?? "development").trim();

export enum UserStatus {
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
}

interface UserResponseDataMap {
    [UserStatus.LOGIN_SUCCESS]: {
        email: string;
        accessToken: string;
        refreshToken: string;
    };
}

export const UserResponseMap: {
    [k in keyof UserResponseDataMap]: ResponseMeta<UserResponseDataMap[k]>;
} = {
    [UserStatus.LOGIN_SUCCESS]: {
        statusCode: 201,
        message: "로그인에 성공하였습니다.",
        data: null,
    },
};
