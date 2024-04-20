import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { UserBook } from "@prisma/client";
import {
  Card,
  CardBody,
  CardHeader,
  NextUIProvider,
  Image,
  CardFooter,
  Divider,
  Progress,
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
        .from("UserBook")
        .select(
          `
          bookId,
          book:Book(*)
        `
        ) // Adjust based on your column names and table relationships
        .eq("userId", userId)
        .eq("status", "READING");

      if (userBooksError) throw userBooksError;

      // The resulting userBooks array contains UserBook entries along with the related Book details
      // You can now access the book details for each UserBook entry
      return userBooks?.map((userBook) => userBook.book);
    } catch (error) {
      console.error("Error fetching currently reading books:", error);
      return [];
    }
  }
}

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentlyReadingBooks().then((books) => {
      setBooks(books as any);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading books...</div>;

  return (
    <div className="">
      {userId !== null ? (
        <div>
                  <h2 className="text-inherit text-xl font-bold mb-2">Currently Reading:</h2>
                  <p className="text-default-500">list of all the books you are reading</p>
                  <Divider className="my-4" />
          <ul className="gap-4 grid grid-cols-1 mb-2">
            {books.map(
              (book: {
                id: number;
                title: string;
                author: string;
                coverImage: string;
              }) => (
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
                <Card
                  shadow="sm"
                  key={book.id}
                  isPressable
                  onPress={() => console.log("item pressed")}
                    >
                        <Progress color="danger" size='sm' aria-label="Loading..." value={70} />
                        <CardFooter className="text-small justify-between">
                            
                    <div className="flex gap-1">
                      {" "}
                      <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={book.coverImage}
                        width={30}
                      />
                      <b className="h-auto content-center">{book.title}</b>
                    </div>

                    <p className="text-default-500">{book.author}</p>
                        </CardFooter>
                        
                        
                </Card>
                // <li key={book.id}>{book.title} by {book.author} { <img src={book.coverImage} alt="" /> }</li>
              )
            )}
          </ul>
        </div>
      ) : (
        <h2>Log in to see books that you are reading</h2>
      )}
    </div>
  );
};

export default BookList;

//<Progress
//    label="Pages read"
//      size="sm"
//      value={4000}
//      maxValue={10000}
//      color="success"
//      formatOptions={{style: "percent"}}
//     showValueLabel={true}
//      className="max-w-md px-2"
//    />