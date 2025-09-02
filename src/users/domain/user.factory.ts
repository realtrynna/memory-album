import { CreateUserCommand } from "@/users/application/commands/create-user.command";
import type { Prisma } from '@prisma/client'

export class UserFactory {
    create({ email, name, password, phone, birthday, provider }: CreateUserCommand): Prisma.UserCreateInput   {
        return {
            email,
            name,
            password,
            phone,
            birthday,
            provider
        }
    }
}