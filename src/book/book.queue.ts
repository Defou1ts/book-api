import { inject, injectable } from "inversify";
import { BaseQueue } from "../common/base.queue";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import { IBookQueue } from "./book.queue.interface";
import { CreateBookDto } from "./dto/create-book.dto";
import { IConfigService } from "../config/config.interface";

@injectable()
export class BookQueue extends BaseQueue implements IBookQueue {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {
		super("book", loggerService, configService);
	}

	async addCreateBookJob(book: CreateBookDto): Promise<void> {
		await this.addJob<CreateBookDto>("create", book);
	}
}
