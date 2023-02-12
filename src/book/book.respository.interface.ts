import { IBook } from "./book.model";
import { CreateBookDto } from './dto/create-book.dto';

export interface IBookRepository {
	create: (book: CreateBookDto) => Promise<IBook>;
	getAll: () => Promise<IBook[]>;
}
