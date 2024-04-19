import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { UserBook } from '@prisma/client';
import {
    Card,
    CardBody,
    CardHeader,
    NextUIProvider,
    Image,
    CardFooter,
  } from "@nextui-org/react";

// const BookList = () => {
//     const [books, setBooks] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function loadBooks() {
//             try {
//                 setLoading(true);
//                 const { data, error } = await supabase
//                     .from('Book') // Your table name here
//                     .select('*');
//                 if (error) throw error;
//                 if (data) setBooks(data);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         loadBooks();
//     }, []);

//     if (loading) return <div>Loading...</div>;

//     return (
//         <div>
//             <ul>
//                 {books.map((book) => (
//                     <li key={book.id}>
//                         <h2>{book.title}</h2>
//                         <p>{book.author}</p>
//                         <img src={book.coverImage} alt="" />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

let userId: null = null;

async function fetchCurrentlyReadingBooks() {
    const { data } = await supabase.auth.getSession();
    const username = data.session?.user?.email;
    

    let { data: User, error } = await supabase
            .from("User")
            .select("*")
            .eq("email", username);
    
    if (User !== null) {
        userId = (User as any)[0].id;
    
       

        try {
            let { data: userBooks, error: userBooksError } = await supabase
                .from('UserBook')
                .select(`
          bookId,
          book:Book(*)
        `) // Adjust based on your column names and table relationships
                .eq('userId', userId)
                .eq('status', 'READING');
  
            if (userBooksError) throw userBooksError;
  
            // The resulting userBooks array contains UserBook entries along with the related Book details
            // You can now access the book details for each UserBook entry
            return userBooks?.map(userBook => userBook.book);
        } catch (error) {
            console.error('Error fetching currently reading books:', error);
            return [];
        }
    }
}

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        fetchCurrentlyReadingBooks().then(books => {
            setBooks(books as any);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading books...</div>;

    return (
        <div className='mx-48'>
            {userId !== null
                ?
                <div>
                    
                   <h2 className='text-2xl'>Currently Reading:</h2>
            <ul className='gap-4 grid grid-cols-2 sm:grid-cols-3'>
                
                        {books.map((book: { id: number; title: string; author: string; coverImage: string; }) => (
                    // <Card className="py-4 m-4 w-36">
                    // <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    //                 <p className="text-tiny uppercase font-bold">{ book.title}</p>
                    //                 <small className="text-default-500">{book.author}</small>
                    // </CardHeader>
                    // <CardBody className="overflow-visible py-2">
                    //   <Image
                    //     alt="Card background"
                    //     className="object-cover rounded-xl"
                    //                     src={ book.coverImage}
                    //     width={50}
                    //   />
                    // </CardBody>
                    //         </Card>
                            <Card  shadow="sm" key={book.id} isPressable onPress={() => console.log("item pressed")}>
                            <CardBody className="overflow-visible p-0">
                              <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={book.title}
                                className="w-full object-cover h-[140px]"
                                src={book.coverImage}
                              />
                            </CardBody>
                            <CardFooter className="text-small justify-between">
                              <b>{book.title}</b>
                              <p className="text-default-500">{book.author}</p>
                            </CardFooter>
                          </Card>
                    // <li key={book.id}>{book.title} by {book.author} { <img src={book.coverImage} alt="" /> }</li>
                ))}
            </ul> 
            </div>
            
                : <h2>Log in to see books that you are reading</h2>
            }
                      
        </div>
    );

 }

export default BookList;