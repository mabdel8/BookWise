// components/SearchBooks.tsx
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (query.length > 4) { // To avoid too many requests, start searching after 2 characters
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyCzseqZ6P-xI446yN4z7rG4IDwh9tbuoQw`)
        .then((res) => res.json())
        .then((data) => {
          setBooks(data.items || []);
        });
    } else {
      setBooks([]);
    }
  }, [query]);

  return (
    <div className=''>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
        className='p-2 border border-gray-300 rounded-lg w-full'
      />
      <ul>
        {books.map((book: any) => (
          <li className='p-2' key={book.id}>
            <Link href={`/books/${book.id}`}>
                {book.volumeInfo.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBooks;
