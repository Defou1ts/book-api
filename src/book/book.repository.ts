import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import { IMongoService } from "../database/mongo.service.interface";
import { TYPES } from "../types";
import { bookSchema, IBook } from "./book.model";
import { IBookRepository } from "./book.respository.interface";
import { CreateBookDto } from "./dto/create-book.dto";

@injectable()
export class BookRepository implements IBookRepository {
	private BookModel: Model<IBook>;

	constructor(@inject(TYPES.MongoService) private mongoService: IMongoService) {
		this.BookModel = mongoService.client.model<IBook>("Book", bookSchema);
	}

	async create(book: CreateBookDto): Promise<IBook> {
		const bookModel = new this.BookModel(book);
		return await new this.BookModel(book).save();
	}

	async getAll(): Promise<IBook[]> {
		return await this.BookModel.find().exec();
	}
}
