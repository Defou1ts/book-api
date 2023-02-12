import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { BaseController } from "../common/base.controller";
import { ValidateMiddleware } from "../common/validate.middleware";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { IBookController } from "./book.interface";
import { IBookRepository } from "./book.respository.interface";
import { CreateBookDto } from "./dto/create-book.dto";

@injectable()
export class BookController extends BaseController implements IBookController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.BookRepository) private bookRepository: IBookRepository
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: "",
				method: "get",
				func: this.getAll,
			},
			{
				path: "",
				method: "post",
				func: this.addBook,
				middlewares: [new ValidateMiddleware(CreateBookDto)],
			},
		]);
	}
	async getAll(req: Request, res: Response, next: NextFunction) {
		const books = await this.bookRepository.getAll();

		this.send(res, 200, books);
	}

	async addBook({ body }: Request, res: Response, next: NextFunction) {
		const book = await this.bookRepository.create(body);

		this.send(res, 201, book);
	}
}
