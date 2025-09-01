import type { Provider } from "@/users/application/commands/create-user.command";

/**
 * 비즈니스 로직(비밀번호 변경 등)과 상태를 가진 객체
 */
export class User {
    constructor(
        private readonly id: number,
        private email: string,
        private name: string,
        private password: string,
        private phone: string,
        private birthday: string,
        private provider: Provider
    ) {
    }
}

