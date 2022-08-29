export interface BookDetails {
	bookId: number;
	logo: string;
	title: string;
	category: string;
	price: number;
	authorId: number;
	authorName: string | null;
	publisher: string;
	publishDate: Date | null;
	content: string;
	active: number;
	createdDate: Date;
	modifiedDate: Date;

}