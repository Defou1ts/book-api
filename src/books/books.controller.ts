import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { inject, injectable } from 'inversify';
import { ParsedQs } from 'qs';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IBookController } from './books.interface';


@injectable()
export class BooksController extends BaseController implements IBookController {
	constructor(@inject(TYPES.LoggerService) private loggerService:ILogger) {
		super(loggerService);
		this.bindRoutes([
			{
				path:'/getAll',
				method: 'get',
				func: this.getAll,
			}
		])
	}
	getAll: (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
	addBook: (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
}