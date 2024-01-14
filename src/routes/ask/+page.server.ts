import {
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
    PUBLIC_OPENAI_API_KEY,
  } from "$env/static/public";
  import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";
import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
  
  const supabaseClient = createClient(
      PUBLIC_SUPABASE_URL,
      PUBLIC_SUPABASE_KEY
  )
const openaiClient = new OpenAI({ apiKey: PUBLIC_OPENAI_API_KEY });

let userId = getUserID();
async function getUserID() {
    try {
      let supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
      let user = await supabase.auth.getUser();
      return user.data.user.id;
    } catch (e) {
      console.log(e);
    }
  }


  
export const actions = {
    customAction: async (event) => {
        try {
            // Perform your custom action logic here
            // You can access form data using: const data = await event.request.formData();
            let message = "hello there ${userId}";
            // Example: Return a success message
            return new Response(message, {
                status: 200,
                headers: new Headers({
                  'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                  'Content-Type': 'text/plain',
                }),
              });
          } catch (error) {
            console.error('Error executing custom action:', error);
            // Example: Return an error message
            return new Response("hello there", {
                status: 200,
                headers: new Headers({
                  'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                  'Content-Type': 'text/plain',
                }),
              });
          }
        },
      }
    // default: async () => {
    //     console.log("bob");
    //     return new Response(JSON.stringify({ bob: "bob" }), {
    //         status: 200,
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    // },
    // getDocuments: async ({ request, locals }) => {
    //     try {
    //       // Use the Supabase client to retrieve the list of file IDs from user_data table
    //       const { data: userData, error: userError } = await supabaseClient
    //         .from("user_data")
    //         .select("file_list")
    //         .eq("user_id", userId)
    //         .single();
      
    //       if (userError) {
    //         console.error("Error fetching user data:", userError);
    //         //   return [];
    //           return new Response(JSON.stringify({ error: userError }), {
    //               status: 500,
    //               headers: {
    //                   "Content-Type": "application/json",
    //               },
    //           });
    //       }
      
    //       const fileIds = userData ? userData.file_list || [] : [];
    //       let documents = [];
      
    //       // Loop through each file ID and retrieve the file details using OpenAI API
    //       for (const fileId of fileIds) {
    //         const fileDetails = await openaiClient.files.retrieve(fileId);
    //         documents.push(fileDetails);
    //       }
      
    //         return new Response(JSON.stringify(documents), {
    //             status: 200,
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //     } catch (error) {
    //       console.error("Error retrieving documents:", error);
    //       // Handle error as needed
    //         return new Response(JSON.stringify({ error: error }), {
    //             status: 500,
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //     }
    // },
    //   register: async ({ request, locals }) => {
    //       const body = Object.fromEntries(await request.formData())
    //       // console.log("body", body);
    //       // console.log("locals", locals);
    //       // console.log("body.email", body.email);
    //       // console.log("body.password", body.password);
    //       const { data, error: err } = await locals.sb.auth.signUp({
    //           email: body.email as string,
    //           password: body.password as string,
    //       })
  
    //       if (err) {
    //           if (err instanceof AuthApiError && err.status === 400) {
    //               return fail(400, {
    //                   error: "Invalid email or password",
    //               })
    //           }
    //           return fail(500, {
    //               error: "Server error. Please try again later.",
    //           })
    //       }
  
    //       throw redirect(303, "/")
    //   },
  