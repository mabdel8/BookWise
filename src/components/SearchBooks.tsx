// components/SearchBooks.tsx
import { Divider, Input, Kbd } from '@nextui-org/react';
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
    <div className='mb-4'>
      <Input
        type="text"
        value={query}
        variant="bordered"
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setQuery(e.target.value)}
        placeholder="search for books..."
      />
      <div style={{ transform: 'translateX(460px)'}} className='hidden lg:block lg:absolute lg:top-12'><Kbd keys={["command"]}>K</Kbd></div>
      <ul className='absolute z-20 bg-black rounded-lg'>
        {books.map((book: any) => (
          <li className='p-2' key={book.id}>
            <Link href={`/books/${book.id}`}>
                {book.volumeInfo.title}
            </Link>
            <Divider className="my-4" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBooks;
