import type { MemberType } from "@/types";

import { lazy, Suspense, useState } from "react";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import { members } from "./mockup-data";

const EditorView = lazy(() => import("./ui/view"));
const EditorForm = lazy(() => import("./ui/form"));

export default function Editor() {
  const [data, setData] = useState<MemberType[]>(members);
  const [showModalEditor, setShowModalEditor] = useState(false);
  const [activeMember, setActiveMember] = useState<MemberType | null>(null);

  function handleModalShow(memberId: string): void {
    setActiveMember(members.find((member) => member.tag === memberId) || null);
    setShowModalEditor(true);
  }

  function handleModalCancel(): void {
    setActiveMember(null);
    setShowModalEditor(false);
  }

  return (
    <div>
      <Suspense fallback={<Loading title="Загрузка редактора" />}>
        <h2 className="mt-5 mb-4">Форма добавления участника</h2>

        <EditorForm setValue={setData} />
      </Suspense>

      <Suspense fallback={<Loading title="Загрузка просмотрщика" />}>
        <h2 className="mt-5 mb-4">Просмотрщик данных</h2>

        <EditorView members={data} openEditor={handleModalShow} />
      </Suspense>

      <Modal
        show={showModalEditor}
        onHide={() => setShowModalEditor(!showModalEditor)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditorForm setValue={() => {}} currentValue={activeMember} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalCancel}>
            Отмена
          </Button>
          <Button variant="primary" disabled onClick={() => {}}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function Loading({ title }: { title: string }) {
  return (
    <div className="w-100 h-100 mt-4">
      {title && <p className="h2">{title}</p>}
      <ProgressBar animated now={100} />
    </div>
  );
}
