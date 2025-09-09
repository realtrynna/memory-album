export enum ExceptionMessage {
    ALREADY_EXISTS = "해당 이메일(${email})로 가입된 사용자가 이미 존재합니다. 다른 이메일을 사용해 주세요.",
    TOKEN_EXPIRED = "토큰의 유효 기간이 만료되었습니다. 토큰을 재발급해 주세요.",
    TOKEN_VALIDATE = "올바르지 않은 토큰입니다.",
    NOT_FOUND = "해당 이메일로 가입된 사용자가 존재하지 않습니다. 회원가입 후 로그인해 주세요.",
    PASSWORD_NOT_MATCHED = "입력한 비밀번호가 정확하지 않습니다. 비밀번호를 다시 확인해 주세요.",
}
