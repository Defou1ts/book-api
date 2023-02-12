import { injectable } from "inversify";
import { BookModel, IBook } from "./book.model";
import { IBookRepository } from "./book.respository.interface";
import { CreateBookDto } from "./dto/create-book.dto";

@injectable()
export class BookRepository implements IBookRepository {
	create(book: CreateBookDto): Promise<IBook> {
		return new BookModel(book).save();
	}

	getAll(): Promise<IBook[]> {
		return BookModel.find().exec();
	}
}
