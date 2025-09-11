import { TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";

@Controller("/test")
export class AppController {
    @TypedRoute.Post("/here")
    test() {
        console.log("Hello World!");
    }
}
