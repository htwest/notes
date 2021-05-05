import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader } from "semantic-ui-react";

const Note = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  return (
    <div className="note-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button color="red" onClic={open}>
            Delete
          </Button>
        </>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </div>
  );
};

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes${id}`);
  const { data } = await res.json();

  return { note: data };
};

export default Note;
