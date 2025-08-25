import type { MemberType } from "@/types";

import { Badge, Button, Table } from "react-bootstrap";

export default function EditorView({
  members,
  openEditor = () => {},
  deleteMember = () => {},
}: {
  members: MemberType[];
  openEditor?: (memberId: string) => void;
  deleteMember?: (memberId: string) => void;
}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>First Name</th>
          <th>User's tag</th>
          <th>Description</th>
          <th>General role</th>
          <th>All roles</th>
          <th>Meta</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr
            key={member.tag}
            onClick={openEditor ? () => openEditor(member.tag) : undefined}
          >
            <td>
              <img
                width={32}
                height={32}
                className={"rounded-2"}
                src={
                  member.avatar ||
                  "https://laf-team.ru/images/avatars/default.webp"
                }
              />
            </td>
            <td>{member.name}</td>
            <td>{member.tag}</td>
            <td
              style={{
                minWidth: "360px",
                width: "35%",
              }}
            >
              {member.description}
            </td>
            <td>
              <Badge bg="primary">{member.roles.slice(0, 1)}</Badge>
            </td>
            <td>
              {member.meta?.includes("no-roles")
                ? "~"
                : member.roles.join(", ")}
            </td>
            <td>
              {member.meta?.map((meta) => (
                <Badge key={meta} bg="secondary">
                  {meta}
                </Badge>
              ))}
            </td>
            <td>
              {deleteMember && (
                <Button
                  variant="secondary"
                  onClick={() => deleteMember(member.tag)}
                >
                  x
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
