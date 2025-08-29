import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConsoleLogger } from "@nestjs/common";
import { DtoExceptionFilter } from "@libs/dto.exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new ConsoleLogger({
            prefix: "Memory album",
            colors: true,
            timestamp: true,
        }),
    });

    app.setGlobalPrefix("api");
    app.useGlobalFilters(new DtoExceptionFilter());

    await app.listen(3000);
}

bootstrap();
