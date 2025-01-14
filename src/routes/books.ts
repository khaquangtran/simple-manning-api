import express, { Request, Response } from 'express'
import { getBookById, getBooks } from '../services/books'

const router = express.Router()

router.get('/', async (req: Request, res) => {
  const author = String(req.query.author ?? '')
  const title = String(req.query.title ?? '')
  const page = Number(req.query.page ?? 1)
  const take = Number(req.query.take ?? 20)
  const skip = (page - 1) * take

  const books = await getBooks({
    where: {
      author: {
        contains: author,
        mode: 'insensitive',
      },
      title: {
        contains: title,
        mode: 'insensitive',
      },
    },
    skip,
    take,
  })

  res.json(books)
  return
})

router.get('/:bookId', async (req: Request, res: Response) => {
  const bookId = Number(req.params.bookId)

  const book = await getBookById(bookId)

  if (!book) {
    res.status(404).json({ message: `Book ${bookId} not found` })
    return
  }

  res.json(book)
})

export default router
