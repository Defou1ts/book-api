import { Container } from "inversify";
import { ContainerModule } from "inversify/lib/container/container_module";
import { interfaces } from "inversify/lib/interfaces/interfaces";
import { App } from "./app";
import { BookController } from "./book/book.controller";
import { IBookController } from "./book/book.interface";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { MongoService } from "./database/mongo.service";
import { IMongoService } from "./database/mongo.service.interface";
import { ILogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App).inSingletonScope();
	bind<IBookController>(TYPES.BookController).to(BookController).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<IMongoService>(TYPES.MongoService).to(MongoService).inSingletonScope();
});

function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { appContainer, app } = bootstrap();
