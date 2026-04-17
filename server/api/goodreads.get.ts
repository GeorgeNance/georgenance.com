import { parseStringPromise } from 'xml2js'

const GOODREADS_USER_ID = '60052775'
const SHELF = 'currently-reading'

interface GoodreadsBook {
  title: string
  author: string
  coverUrl: string
  url: string
  pages: number | null
  averageRating: string
  dateAdded: string
}

export default defineEventHandler(async (event) => {
  const feedUrl = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=${SHELF}`

  try {
    const xml = await $fetch<string>(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; bot)',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
      responseType: 'text',
    })

    const parsed = await parseStringPromise(xml, { explicitArray: false })
    const items = parsed?.rss?.channel?.item

    if (!items) return []

    const bookList = Array.isArray(items) ? items : [items]

    const books: GoodreadsBook[] = bookList.map((item: any) => ({
      title: cleanTitle(item.title || ''),
      author: item.author_name || 'Unknown',
      coverUrl: item.book_large_image_url || item.book_medium_image_url || item.book_image_url || '',
      url: item.book_id ? `https://www.goodreads.com/book/show/${item.book_id}` : item.link || '',
      pages: item.book?.num_pages ? parseInt(item.book.num_pages) : null,
      averageRating: item.average_rating || '',
      dateAdded: item.user_date_added || '',
    }))

    setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')

    return books
  } catch {
    throw createError({ statusCode: 502, message: 'Failed to fetch Goodreads data' })
  }
})

function cleanTitle(title: string): string {
  return title
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .trim()
}
