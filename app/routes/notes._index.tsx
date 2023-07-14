import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";

export const loader = async () => {
  return json({ notes: await getStoredNotes() });
};

export default function NotesList() {
  const { notes } = useLoaderData<typeof loader>();
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="col-start-1 col-span-2">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          My amazing notes
        </h1>
      </div>

      <div className="col-start-1">
        <ul className="font-medium p-4 mt-4 border border-gray-100 rounded-lg">
          {notes.map((note) => (
            <li>
              <Link to={note.title}>Note: {note.title}</Link>
            </li>
          ))}
        </ul>
        <Link
          to="/notes/new"
          className="block py-2 pl-3 pr-4 [&.active]:text-blue-700  text-gray-900 rounded hover:text-blue-700"
        >
          New Note
        </Link>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Note not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
