import type { MemberType } from "../../types";

import { useState, useId } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function EditorForm({
  setValue,
}: {
  setValue: (v: any[]) => void;
}) {
  const [data, setData] = useState<MemberType[]>([]);
  const [userPreviewName, setUserPreviewName] = useState<string>("User");

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    console.log(event, form.name.value);

    event.preventDefault();
    event.stopPropagation();

    const newRow: MemberType = {
      name: form.name.value,
      tag: form.tag.value,
      roles: form.roles.value.trim().split(",") || [],
      description: form.description.value,
      socials: [],
      avatar: undefined,
      meta: [],
    };

    setData(
      setValue((data) => [
        newRow,
        ...data.filter((r) => r.tag !== form.tag.value),
      ]),
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <EditorFormInput
        onChange={(e) => setUserPreviewName(e.target.value || "User")}
        id="name"
        label="First name"
      />
      <EditorFormInput id="tag" label={`${userPreviewName}'s tag`} />
      <EditorFormInput
        id="description"
        label={`${userPreviewName}'s description`}
      />
      <EditorFormInput
        id="roles"
        label={`${userPreviewName}'s roles`}
        defaultValue="Intern"
        placeholder="Frontend Developer, Designer, Sound Producer"
      />

      <Button variant="primary" type="submit">
        Добавить участника
      </Button>
    </Form>
  );
}

function EditorFormInput({
  id,
  label,
  type = "text",
  placeholder,
  description,
  defaultValue,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  onChange?: (e: any) => void;
}) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        placeholder={placeholder || label}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <Form.Text className="text-muted">{description}</Form.Text>
    </Form.Group>
  );
}
