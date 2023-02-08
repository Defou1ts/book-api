import "reflect-metadata";
import { Response, Router } from "express";
import { injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { ExpressReturnType, IControllerRoute } from "./route.interface";

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, messsage: T): ExpressReturnType {
		res.type("application/json");
		return res.status(code).send(messsage);
	}

	public ok<T>(res: Response, messsage: T): ExpressReturnType {
		return this.send<T>(res, 200, messsage);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const handler = route.func.bind(this);
			this._router[route.method](route.path, handler);
		}
	}
}
