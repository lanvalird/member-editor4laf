import { useContext } from "react";
import { Button } from "react-bootstrap";

import { EditorContext } from "../context";

export function EditorJson() {
  const editorCtx = useContext(EditorContext);
  const members = editorCtx.members;

  const stringify = JSON.stringify;

  return (
    <div
      className="d-flex flex-column col-6 pt-5 gap-4"
      style={{ maxHeight: "100vh" }}
    >
      <h2 className="mt-5 mb-4">Итоговый JSON</h2>

      <pre className="max-h-100 ">{stringify(members, undefined, 2)}</pre>

      <Button
        className="mt-4"
        variant="secondary"
        onClick={(event) => {
          const element = event.target as HTMLButtonElement;

          setTimeout(() => {
            element.innerText = "Скопировать";
          }, 1000);

          navigator.clipboard.writeText(stringify(members));
          element.innerText = "Скопировано!";
        }}
      >
        Скопировать
      </Button>
    </div>
  );
}
