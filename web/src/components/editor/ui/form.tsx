import type { MemberType } from "@/types";

import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function EditorForm({
  setValue,
  currentValue = null,
}: {
  setValue: React.Dispatch<React.SetStateAction<MemberType[]>>;
  currentValue?: MemberType | null;
}) {
  const [current, setCurrent] = useState<MemberType | null>(currentValue);
  const [userPreviewName, setUserPreviewName] = useState<string>(
    current?.name || "User"
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    setCurrent({
      name: form["first-name"].value || "",
      tag: form.tag.value,
      roles: form.roles.value.trim().split(",") || [],
      description: form.description.value,
      socials: [],
      avatar: form.avatar.value || undefined,
      meta: form.meta.value.trim().split(",") || undefined,
    });

    if (current) {
      setValue((data) => [
        current,
        ...data.filter((r) => r.tag !== form.tag.value),
      ]);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="row g-3">
      <EditorFormInput
        className="mb-2 col-6"
        id="first-name"
        label="First name"
        defaultValue={currentValue?.name}
        onChange={(
          e: React.ChangeEvent<Element & Partial<HTMLInputElement>>
        ) => {
          const value = e.target.value;
          setUserPreviewName(value || "User");
        }}
      />
      <EditorFormInput
        id="tag"
        className="mb-2 col-6"
        label={`${userPreviewName}'s tag`}
        defaultValue={currentValue?.tag}
      />
      <EditorFormInput
        id="roles"
        className="mb-2 col-12"
        label={`${userPreviewName}'s roles`}
        placeholder="Frontend Developer, Designer, Sound Producer"
        defaultValue={currentValue?.roles.join(",") || "Intern"}
      />
      <EditorFormInput
        id="description"
        type="textarea"
        className="mb-2 col-12"
        label={`${userPreviewName}'s description`}
        defaultValue={currentValue?.description}
      />
      <EditorFormInput
        id="avatar"
        className="mb-2 col-8"
        label={`${userPreviewName}'s avatar URL`}
        placeholder={`https://example.com/${userPreviewName.toLowerCase()}.png`}
        defaultValue={currentValue?.avatar}
      />
      <EditorFormInput
        id="meta"
        className="mb-2 col-4"
        label={`${userPreviewName}'s meta`}
        placeholder="no-gh,no-roles"
        defaultValue={currentValue?.meta?.join(",") || "no-gh"}
      />

      <Button className="mt-4" variant="primary" type="submit">
        Добавить или изменить участника
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
  className,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent) => void;
}) {
  return (
    <Form.Group className={className || "mb-3"} controlId={id}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        placeholder={placeholder || label}
        defaultValue={defaultValue}
        onChange={onChange}
        {...(type === "textarea"
          ? {
              as: "textarea",
              rows: 3,
            }
          : {})}
      />
      <Form.Text className="text-muted">{description}</Form.Text>
    </Form.Group>
  );
}
