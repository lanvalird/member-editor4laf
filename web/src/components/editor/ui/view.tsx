import React, { useContext } from "react";
import { Badge, Button, Table } from "react-bootstrap";

import { EditorContext } from "../context";

const TABLE_HEADINGS: string[] = [
  "Avatar",
  "First Name",
  "User's tag",
  "Description",
  "All roles",
  "Meta",
  "",
];

export default function EditorView({
  openEditor = () => {},
  deleteMember = () => {},
}: {
  openEditor: (memberTaq: string) => void;
  deleteMember: (memberTaq: string) => void;
}) {
  const headings = TABLE_HEADINGS;

  const editorCtx = useContext(EditorContext);
  const members = editorCtx.members;

  function handleChangeMember(tag: string) {
    openEditor(tag);
  }

  function handleMemberDelete(tag: string) {
    deleteMember(tag);
  }

  return (
    <Table striped bordered hover>
      <TableHeader>
        <TableRow>
          {headings.map((heading) => (
            <th key={heading}>{heading}</th>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow
            key={member.tag}
            onClick={() => handleChangeMember(member.tag)}
          >
            <TableData
              style={{
                width: ".25rem",
              }}
            >
              <MemberAvatar src={member.avatar} alt={member.tag} />
            </TableData>

            <TableData>{member.name}</TableData>
            <TableData>{member.tag}</TableData>
            <TableData
              style={{
                minWidth: "360px",
                width: "35%",
              }}
            >
              {member.description}
            </TableData>

            <TableData>
              <Badge>{member.roles[0]}</Badge>
              {member.roles.length > 1 ? ", " : null}
              {member.roles.slice(1).join(", ")}
            </TableData>

            <TableData>{member.meta?.join(", ")}</TableData>
            <TableData>
              <Button
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  handleMemberDelete(member.tag);
                }}
              >
                x
              </Button>
            </TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
}

function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

function TableRow({
  children,
  ...props
}: {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
}) {
  return <tr {...props}>{children}</tr>;
}

function TableData({
  children,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return <td {...props}>{children || <em>none</em>}</td>;
}

function MemberAvatar({ src, alt }: Partial<{ src: string; alt: string }>) {
  if (!src) {
    src = "https://laf-team.ru/images/avatars/default.webp";
  }

  return (
    <img
      className="w-100 ratio ratio-1x1 rounded-2"
      src={src}
      alt={alt || "Member's Avatar"}
    />
  );
}
