import { writable } from "svelte/store";

function sidebar(supabase) {
  const number_of_docs = writable(0);

  supabase
    .table("documents")
    .select("id", { count: "exact" })
    .execute()
    .then((response) => {
      number_of_docs.set(response.count);
    });

  return {
    number_of_docs,
  };
}

function number_of_documents(supabase) {
  return supabase
    .table("documents")
    .select("id", { count: "exact" })
    .execute()
    .then((response) => response.count);
}
