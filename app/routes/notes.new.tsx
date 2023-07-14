import { ActionArgs, redirect } from "@remix-run/node";
import { useNavigation } from "@remix-run/react";
import NewNote from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";
import type { Note } from "~/data/notes";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const noteData = {
    title: formData.get("title"),
    content: formData.get("content"),
  } as Note;
  const existingNotes = await getStoredNotes();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  return redirect("/notes");
};

export default function NewNotes() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <main className="flex flex-col items-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        My amazing notes
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl">
        Enter a new note plz
      </p>
      <NewNote />
    </main>
  );
}
