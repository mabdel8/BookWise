"use client";
import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { useState } from "react";



export default async function addBookToUserList(book: any) {


  const { data } = await supabase.auth.getSession();
    const username = data.session?.user?.email;
    console.log(username)
    console.log(book.volumeInfo.industryIdentifiers.find((identifier: any) => identifier.type === "ISBN_10")?.identifier)
    console.log(book.volumeInfo.title)

  let { data: User, error } = await supabase
    .from("User")
    .select("*")
    .eq("email", username);

if (!User) {
    console.error("User not logged in");
    return;
    }
    // 
    console.log('below is id:')
    console.log((User as any)[0].id)
    console.log(User)

// Step 1: Check if the book already exists
let { data: existingBooks, error: bookSearchError } = await supabase
    .from("Book")
    .select("id")
    .eq("isbn", book.volumeInfo.industryIdentifiers.find((identifier: any) => identifier.type === "ISBN_10")?.identifier)
    .single();

  if (bookSearchError && bookSearchError.message !== "No rows found") {
    console.error("Error searching for book:", bookSearchError);
    }


  let bookId = existingBooks?.id;

  // Step 2: If the book doesn't exist, add it to the Book table
  if (!existingBooks) {
    const { data: newBook, error: bookInsertError } = await supabase
      .from("Book")
      .insert([
        {
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors,
          isbn: book.volumeInfo.industryIdentifiers.find((identifier: any) => identifier.type === "ISBN_10")?.identifier,
          synopsis: book.volumeInfo.description,
          coverImage: book.volumeInfo.imageLinks.smallThumbnail,
          publishDate: book.volumeInfo.publishedDate,
        },
      ])
      .single();

    if (bookInsertError) {
      console.error("Error adding new book:", bookInsertError);
      return;
    }

    bookId = (newBook as any)?.id;
    }
    
    try {
        const { data, error } = await supabase
          .from('UserBook') // Replace 'UserBook' with your table name if different
          .select('*')
          .eq('userId', (User as any)[0].id)
          .eq('bookId', bookId)
          .single(); // Use .single() if you expect 0 or 1 records to match the query
    
        if (error) {
          console.error('Error checking user-book existence:', error);
          return false; // Consider how you want to handle errors in your app
        }

        if (!data) {
            const { error: userBookInsertError } = await supabase
            .from("UserBook")
            .insert([
              {
                userId: (User as any)[0].id,
                bookId: bookId,
                status: "READING", // or any initial status you prefer
              },
            ]);
        
          if (userBookInsertError) {
            console.error("Error adding book to user list:", userBookInsertError);
          } else {
            console.log("Book added to user list successfully");
          }
        } else {
            console.error('BOOK ALREADY EXISTS:',data)
        }
    
        // If data is found, then the user-book relationship exists
        
      } catch (error) {
        console.error('Exception when checking user-book existence:', error);
        return false; // Handle exceptions according to your app's needs
      }

  // Step 3: Add the book to the UserBook table for the current user

}
