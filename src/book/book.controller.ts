import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { BaseController } from "../common/base.controller";
import { ValidateMiddleware } from "../common/validate.middleware";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { IBookController } from "./book.interface";
import { CreateBookDto } from "./dto/create-book.dto";

@injectable()
export class BookController extends BaseController implements IBookController {
	constructor(@inject(TYPES.LoggerService) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{
				path: "/getAll",
				method: "get",
				func: this.getAll,
			},
			{
				path: "/create",
				method: "post",
				func: this.addBook,
				middlewares: [new ValidateMiddleware(CreateBookDto)],
			},
		]);
	}
	getAll(req: Request, res: Response, next: NextFunction) {
		const books = ["book"];

		this.ok<Array<string>>(res, books);
	}
	addBook(req: Request, res: Response, next: NextFunction) {
		this.send(res, 201, req.body);
	}
}
