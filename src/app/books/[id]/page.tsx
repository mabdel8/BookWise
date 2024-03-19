'use client'
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
    const [book, setBook] = useState<any>(null);
    const [userId, setUserId] = useState<number>();
//5iTebBW-w7QC
  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setBook(data.volumeInfo);
        });
        console.log(book)
    // Here you would setBook with the fetched book data
  }, [params.id]);

  if (!book) {
    return <div>Loading...</div>;
  }
    
  const handleAddBook = async () => {
    const userId = 1;
    const response = await fetch('/api/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        coverImage: book.coverImage,
        publishDate: book.publishDate,
      }),
    });

    if (response.ok) {
      console.log('Book added successfully');
      // Handle successful addition (e.g., show a notification)
    } else {
      console.error('Failed to add the book');
      // Handle failure (e.g., show an error message)
    }
  };
    
    let getUser = async () => {
        const { data } = await supabase.auth.getSession();
            if (data.session) {
                
            } else {
                
            }
    }

  // Render book details
  return (
      <div>
        <h1>Book Info:</h1>
          <h1>Title: {book.title}</h1>
          <h1>Author: {book.authors}</h1>
          <h1>Page Count: {book.pageCount}</h1>
          <h1>Published: {book.publishedDate}</h1>
          <img src={book.imageLinks.smallThumbnail} alt="" />
          <Button>Add Book</Button>
    </div>
  );
}