import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getStoredNotes } from "~/data/notes";

export const loader = async ({ params }: LoaderArgs) => {
  const noteTitle = params.noteTitle;
  const notes = await getStoredNotes();
  const note = notes.find((note) => note.title === noteTitle);

  invariant(note, `Note not found`);

  return json({ note });
};

export default function Note() {
  const { note } = useLoaderData<typeof loader>();

  return (
    <main className="flex flex-col items-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        My amazing notes
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl">
        {note.title}
      </p>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl">
        {note.content}
      </p>
    </main>
  );
}
