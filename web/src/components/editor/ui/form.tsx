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

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    console.log(event, form.name.value);

    event.preventDefault();
    event.stopPropagation();

    const newRow: MemberType = {
      name: form.name.value,
      tag: "",
      roles: [],
      description: "",
      socials: [],
      avatar: undefined,
      meta: [],
    };

    setData(setValue((data) => [newRow, ...data]));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <EditorFormInput id="name" label="First name" />

      <Button variant="primary" type="submit">
        Submit
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
}: {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
}) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        placeholder={placeholder || label}
        defaultValue={defaultValue}
      />
      <Form.Text className="text-muted">{description}</Form.Text>
    </Form.Group>
  );
}
