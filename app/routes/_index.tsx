import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      <h1>A better way of keeping track of your notes</h1>
      <p>Early beta</p>
      <p>
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}
