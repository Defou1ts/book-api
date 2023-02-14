import { Queue, ConnectionOptions, Job } from "bullmq";
import { injectable, unmanaged } from "inversify";
import { IConfigService } from "../config/config.interface";
import { ILogger } from "../logger/logger.interface";

@injectable()
export abstract class BaseQueue {
	private queue: Queue;

	constructor(
		@unmanaged() private readonly queueName: string,
		private logger: ILogger,
		private config: IConfigService
	) {
		this.queue = new Queue(this.queueName, {
			connection: {
				host: this.config.get("REDIS_HOST"),
				port: +this.config.get("REDIS_PORT"),
			},
		});
		this.logger.log(`[Queue] Очередь ${this.queueName} успешно подключена`);
	}

	public get name() {
		return this.queueName;
	}

	async addJob<T>(jobName: string, job: T) {
		await this.queue.add(jobName, job);
		this.logger.log(`[${this.queueName}] В очередь добавлена задача ${jobName}`);
	}

	async clear() {
		await this.queue.drain();
	}
}
