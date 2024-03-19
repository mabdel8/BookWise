import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { userId, title, author, isbn, coverImage, publishDate } = req.body;
      
      try {
        // Assuming there's a "books" table and a "userBooks" relation table in Supabase
        let { data: book, error: bookError } = await supabase
          .from('books')
          .select('*')
          .eq('isbn', isbn)
          .single();
  
        if (bookError) throw bookError;
  
        if (!book) {
          // Insert the book if it doesn't exist
          const { data: newBook, error: newBookError } = await supabase
            .from('books')
            .insert([
              { title, author, isbn, coverImage, publishDate }
            ]);
  
            if (newBookError) throw newBookError;
            if(newBook)
                book = newBook[0]; // Assuming the insert was successful
        }
  
        // Add the book to the user's list
        const { data: userBook, error: userBookError } = await supabase
          .from('userBooks')
          .insert([
            { userId, bookId: book.id, status: 'READING' }
          ]);
  
        if (userBookError) throw userBookError;
  
        res.status(200).json(userBook);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
  export default handler;
