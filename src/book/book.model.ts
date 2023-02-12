import { Schema } from "mongoose";

export interface IBook {
	title: string;
	author: string;
}

export const bookSchema = new Schema<IBook>({
	title: { type: String, required: true },
	author: { type: String, required: true },
});
