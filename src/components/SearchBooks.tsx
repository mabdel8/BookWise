// components/SearchBooks.tsx
import React, { useState, useEffect } from 'react';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (query.length > 2) { // To avoid too many requests, start searching after 2 characters
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
      />
      <ul>
        {books.map((book: any) => (
            <li className='p-2' key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBooks;
