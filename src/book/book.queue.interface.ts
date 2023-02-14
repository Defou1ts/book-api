import { CreateBookDto } from "./dto/create-book.dto";

export interface IBookQueue {
	addCreateBookJob: (book: CreateBookDto) => Promise<void>;
}
