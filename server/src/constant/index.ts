import { ResponseMeta } from "@libs/response-wrap";

export const NODE_ENV = (process.env.NODE_ENV ?? "development").trim();

export enum UserStatus {
    SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
}

interface UserResponseDataMap {
    [UserStatus.SIGNUP_SUCCESS]: {
        email: string;
        accessToken: string;
        refreshToken: string;
    };
}

export const UserResponseMap: {
    [k in keyof UserResponseDataMap]: ResponseMeta<UserResponseDataMap[k]>;
} = {
    [UserStatus.SIGNUP_SUCCESS]: {
        statusCode: 201,
        message: "회원가입에 성공하였습니다.",
        data: null,
    },
};
