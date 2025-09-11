import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConsoleLogger } from "@nestjs/common";
import { DtoExceptionFilter } from "@libs/exceptions/user/dto.exception.filter";
import { PrismaExceptionFilter } from "@libs/exceptions/prisma.exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new ConsoleLogger({
            prefix: "Memory album",
            colors: true,
            timestamp: true,
        }),
        /**
         * @TODO 환경 변수로 분리
         */
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });

    app.setGlobalPrefix("api");
    app.useGlobalFilters(new DtoExceptionFilter());
    app.useGlobalFilters(new PrismaExceptionFilter());

    await app.listen(4000);
}

bootstrap();
