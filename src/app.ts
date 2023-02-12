import "reflect-metadata";
import express, { Express, json } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { BookController } from "./book/book.controller";
import { ValidateMiddleware } from "./common/validate.middleware";
import { IConfigService } from "./config/config.interface";
import { IMongoService } from "./database/mongo.service.interface";

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.LoggerService) private logger: ILogger,
		@inject(TYPES.BookController) private bookController: BookController,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.MongoService) private mongoService: IMongoService
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use("/books", this.bookController.router);
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		await this.mongoService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`[App] Сервер запущен на http://localhost:${this.port}`);
	}
}
