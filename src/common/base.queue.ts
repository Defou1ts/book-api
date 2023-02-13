import { Queue, ConnectionOptions } from "bullmq";
import { injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";

@injectable()
export abstract class BaseQueue {
	private queue: Queue;

	constructor(
		private readonly queueName: string,
		private logger: ILogger,
		private connection: ConnectionOptions
	) {
		this.queue = new Queue(this.queueName, {
			connection,
		});
	}

	async addJob(jobName: string, jobPayload: unknown) {
		await this.queue.add(jobName, jobPayload);
		this.logger.log(`[${this.queueName}] В очередь добавлена задача ${jobName}`);
	}

	async clear() {
		await this.queue.drain();
	}
}
