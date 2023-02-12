import { model, Schema } from "mongoose";

export interface IBook {
	title: string;
	author: string;
}

const bookSchema = new Schema<IBook>({
	title: { type: String, required: true },
	author: { type: String, required: true },
});

export const BookModel = model<IBook>("User", bookSchema);
