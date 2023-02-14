import { Worker, Job } from "bullmq";
import { injectable, unmanaged } from "inversify";
import { IConfigService } from "../config/config.interface";
import { ILogger } from "../logger/logger.interface";

@injectable()
export abstract class BaseWoker {
	private worker: Worker;

	constructor(
		@unmanaged() private readonly queueName: string,
		private logger: ILogger,
		private config: IConfigService
	) {
		this.worker = new Worker(this.queueName, this.handleJob.bind(this), {
			connection: {
				host: this.config.get("REDIS_HOST"),
				port: +this.config.get("REDIS_PORT"),
			},
		});
		this.logger.log(`[Worker] Worker ${this.queueName} успешно подключен`);
	}

	async handleJob(job: Job<unknown>): Promise<void> {
		this.logger.log(`[WORKER ${job.queueName}]: Задача ${job.name} успешно выполнена`);
	}
}
