import { Worker, ConnectionOptions, Job } from "bullmq";
import { injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";

@injectable()
export abstract class BaseWoker {
	private worker: Worker;

	constructor(
		private readonly queueName: string,
		private logger: ILogger,
		private connection: ConnectionOptions
	) {
		this.worker = new Worker(this.queueName, this.handleJob.bind(this), {
			connection,
		});
	}

	abstract handleJob(job: Job): Promise<void>;
}
