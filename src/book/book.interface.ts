import { NextFunction, Request, Response } from "express";

export interface IBookController {
	getAll: (req: Request, res: Response, next: NextFunction) => void;
	addBook: (req: Request, res: Response, next: NextFunction) => void;
}
