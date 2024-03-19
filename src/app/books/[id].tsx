import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const BookDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the book ID from the URL
  const [book, setBook] = useState<any>(null);
//5iTebBW-w7QC
  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBook(data.volumeInfo);
        });
        console.log(book)
    // Here you would setBook with the fetched book data
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  // Render book details
  return (
      <div>
        <h1>This is your book info</h1>
      <h1>{book.title}</h1>
      {/* Display more book details here */}
    </div>
  );
};

export default BookDetail;
