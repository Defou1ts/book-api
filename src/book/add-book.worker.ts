import { Job } from "bullmq";
import { inject, injectable } from "inversify";
import { BaseWoker } from "../common/base.worker";
import { IConfigService } from "../config/config.interface";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { BOOK_QUEUENAME } from "./book.constants";
import { IBookRepository } from "./book.respository.interface";
import { CreateBookDto } from "./dto/create-book.dto";

@injectable()
export class AddBookWorker extends BaseWoker {
	constructor(
		@inject(TYPES.BookRepository) private bookRepository: IBookRepository,
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {
		super(BOOK_QUEUENAME, loggerService, configService);
	}

	async handleJob(job: Job<CreateBookDto>): Promise<void> {
		await this.bookRepository.create(job.data);
		super.handleJob(job);
	}
}
