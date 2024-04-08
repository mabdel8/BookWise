'use client'
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import addBookToUserList from "@/app/_services/handleData";



export default function Page({ params }: { params: { id: string } }) {
    const [book, setBook] = useState<any>(null);
    const [userId, setUserId] = useState<number>();
//5iTebBW-w7QC
  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setBook(data);
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
        isbn: book.industryIdentifiers.find((identifier: any) => identifier.type === "ISBN_10")?.identifier,
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
          <h1>Title: {book.volumeInfo.title}</h1>
          <h1>Author: {book.volumeInfo.authors}</h1>
          <h1>Page Count: {book.volumeInfo.pageCount}</h1>
          <h1>Published: {book.volumeInfo.publishedDate}</h1>
          <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="" />
          <Button onClick={() => addBookToUserList(book)}>Add Book</Button>
    </div>
  );
}