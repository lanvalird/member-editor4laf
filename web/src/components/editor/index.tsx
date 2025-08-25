import type { MemberType } from "@/types";

import { lazy, Suspense, useId, useState } from "react";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import { members } from "./mockup-data";

const EditorView = lazy(() => import("./ui/view"));
const EditorForm = lazy(() => import("./ui/form"));

export default function Editor() {
  const [data, setData] = useState<MemberType[]>(members);
  const [showModal, setShowModal] = useState(false);
  const [activeMember, setActiveMember] = useState<MemberType | null>(null);

  const modalSubmitId = useId();

  function handleModalShow(memberId: string): void {
    setActiveMember(data.find((member) => member.tag === memberId) || null);
    setShowModal(true);
  }

  function handleModalClose(): void {
    setActiveMember(null);
    setShowModal(false);
  }

  function saveUser(member: MemberType): void {
    setData((data) => {
      const filtered = data.filter((m) => m.tag !== member.tag);

      return [member, ...filtered];
    });
  }

  function deleteUser(tag: string): void {
    setData((data) => {
      const filtered = data.filter((m) => m.tag !== tag);
      return [...filtered];
    });
  }

  return (
    <div className="row">
      <Suspense fallback={<Loading title="Загрузка редактора" />}>
        <div className="d-flex flex-column col-6 pt-5 gap-4">
          <h2>Форма добавления участника</h2>

          <EditorForm onSave={saveUser}>
            <Button variant="primary" type="submit">
              Добавить или изменить участника
            </Button>
          </EditorForm>
        </div>
      </Suspense>

      <div
        className="d-flex flex-column col-6 pt-5 gap-4"
        style={{ maxHeight: "100vh" }}
      >
        <h2 className="mt-5 mb-4">Итоговый JSON</h2>

        <pre className="max-h-100 ">{JSON.stringify(data, undefined, 2)}</pre>

        <Button
          className="mt-4"
          variant="secondary"
          onClick={(e) => {
            const el = e.target as HTMLElement;

            setTimeout(() => {
              el.innerText = "Скопировать";
            }, 1000);

            navigator.clipboard.writeText(JSON.stringify(data));
            el.innerText = "Скопировано!";
          }}
        >
          Скопировать
        </Button>
      </div>

      <Suspense fallback={<Loading title="Загрузка просмотрщика" />}>
        <div className="col-12">
          <h2 className="mt-5 mb-4">Просмотрщик данных</h2>

          <EditorView
            members={data}
            openEditor={handleModalShow}
            deleteMember={deleteUser}
          />
        </div>
      </Suspense>

      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
        onHide={() => setShowModal(!showModal)}
      >
        <Modal.Header>
          <Modal.Title>
            Настройка пользователя {activeMember?.name} (@
            {activeMember?.tag.toLowerCase()})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditorForm onSave={saveUser} currentValue={activeMember}>
            <Button
              id={modalSubmitId}
              className="d-none mt-4"
              variant="primary"
              type="submit"
            >
              Добавить или изменить участника
            </Button>
          </EditorForm>
        </Modal.Body>
        <Modal.Footer
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Button variant="secondary" onClick={handleModalClose}>
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              (
                document.querySelector(`#${modalSubmitId}`) as HTMLButtonElement
              ).click();
              handleModalClose();
            }}
          >
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
