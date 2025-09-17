import express from "express";

const books = [
	{
		id: 1,
		title: "The Great Gatsby",
		author: "F. Scott Fitzgerald",
	},
	{
		id: 2,
		title: "To Kill a Mockingbird",
		author: "Harper Lee",
	},
];

const app = express();

app.use(express.json());

app.get("/books", (req, res) => {
	res.json(books);
});

app.get("/books/:id", (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({ message: "Könyv ID kötelező!" });
	}

	const book = books.find((b) => b.id === parseInt(req.params.id));
	if (!book) {
		return res.status(404).json({ message: "Könyv nem található" });
	}
	res.json(book);
});

app.post("/books", (req, res) => {
	const { title, author } = req.body;

	if (!title || !author) {
		return res.status(400).json({ message: "Cím és szerző kötelező!" });
	}

	const newBook = {
		id: books[books.length - 1]?.id + 1,
		title,
		author,
	};
	books.push(newBook);
	res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
	const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));

	if (bookIndex == -1) {
		return res.status(404).json({ message: "Könyv nem található" });
	}

	const { title, author } = req.body;
	if (!title || !author) {
		return res.status(400).json({ message: "Cím és szerző kötelező!" });
	}
	books[bookIndex] = { id: parseInt(req.params.id), title, author };
	res.json(books[bookIndex]);
});

app.delete("/books/:id", (req, res) => {
	const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));

	if (bookIndex === -1) {
		return res.status(404).json({ message: "Könyv nem található" });
	}

	books.splice(bookIndex, 1);
	res.status(204);
});

app.listen(5500, () => {
	console.log("Server is running on port 5500");
});
