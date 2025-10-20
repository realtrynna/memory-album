import { IQuery } from "@nestjs/cqrs";

export class GetAlbumsQuery implements IQuery {
    constructor(
        readonly startDate: string,
        readonly endDate: string,
    ) {}
}
