import { tags } from "typia";

export interface CreateUserDto {
    email: string;
    name: string & tags.MinLength<2> & tags.MaxLength<5>;
    password: string &
        tags.Pattern<"^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9]).{6,15}$">;
    phone: string & tags.MinLength<13> & tags.MaxLength<13>;
    birthday: string & tags.Format<"date">;
    provider: string;
}
