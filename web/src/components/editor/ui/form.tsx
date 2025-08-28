import type { Member } from "@/types";

import React, { useState } from "react";
import Form from "react-bootstrap/Form";

export default function EditorForm({
  saveMember,
  currentMember: currentMemberProp = null,
  children,
}: {
  saveMember: (member: Member) => void;
  currentMember?: Member | null;
  children?: React.ReactNode;
}) {
  const [currentMember, setCurrentMember] = useState<Member | null>(
    currentMemberProp
  );
  const [userPreviewName, setUserPreviewName] = useState<string>(
    currentMember?.name || "User"
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    const member = {
      name: form["first-name"].value || "",
      tag: form.tag.value,
      roles: form.roles.value.trim().split(",") || [],
      description: form.description.value,
      socials: [],
      avatar: form.avatar.value || undefined,
      meta: form.meta.value.trim().split(",") || undefined,
    };

    saveMember(member);

    if (currentMember) {
      setCurrentMember(member);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="row g-3">
      <EditorFormInput
        className="mb-2 col-6"
        id="first-name"
        label="First name"
        defaultValue={currentMember?.name}
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
        defaultValue={currentMember?.tag}
      />
      <EditorFormInput
        id="roles"
        className="mb-2 col-12"
        label={`${userPreviewName}'s roles`}
        placeholder="Frontend Developer, Designer, Sound Producer"
        defaultValue={currentMember?.roles.join(",") || "Intern"}
      />
      <EditorFormInput
        id="description"
        type="textarea"
        className="mb-2 col-12"
        label={`${userPreviewName}'s description`}
        defaultValue={currentMember?.description}
      />
      <EditorFormInput
        id="avatar"
        className="mb-2 col-8"
        label={`${userPreviewName}'s avatar URL`}
        placeholder={`https://example.com/${userPreviewName.toLowerCase()}.png`}
        defaultValue={currentMember?.avatar}
      />
      <EditorFormInput
        id="meta"
        className="mb-2 col-4"
        label={`${userPreviewName}'s meta`}
        placeholder="no-gh,no-roles"
        defaultValue={currentMember?.meta?.join(",") || undefined}
      />
      {children}
    </Form>
  );
}

type EditorFormInputProps = {
  id: string;
  label: string;
} & Partial<{
  type: string;
  placeholder: string;
  description: string;
  className: string;
  defaultValue: string;

  onChange: (event: React.ChangeEvent) => void;
}>;

function EditorFormInput({
  id,
  label,
  type = "text",
  placeholder,
  description,
  defaultValue,
  className,
  onChange,
}: EditorFormInputProps) {
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
