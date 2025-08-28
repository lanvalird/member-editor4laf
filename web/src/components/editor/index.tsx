import type { Member, MemberList } from "@/types";

import { lazy, Suspense, useId, useState } from "react";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import { members } from "./mockup-data";
import { EditorContext } from "./context";
import { EditorJson } from "./ui/json";

const EditorView = lazy(() => import("./ui/view"));
const EditorForm = lazy(() => import("./ui/form"));

export default function Editor() {
  const [memberList, setMemberList] = useState<MemberList>(members);
  const [currentMember, setActiveMember] = useState<Member | null>(null);

  const [isOpenModal, setOpenModal] = useState(false);
  const modalSubmitId = useId();

  function openModal(memberId: string): void {
    setActiveMember(
      memberList.find((member) => member.tag === memberId) || null
    );
    setOpenModal(true);
  }

  function closeModal(): void {
    setActiveMember(null);
    setOpenModal(false);
  }

  function saveUser({ tag, ...data }: Member): void {
    setMemberList((members) => {
      const filtered = members.filter((member) => member.tag !== tag);

      return [{ tag, ...data }, ...filtered];
    });
  }

  function deleteUser(tag: string): void {
    setMemberList((members) => {
      const filtered = members.filter((m) => m.tag !== tag);
      return [...filtered];
    });
  }

  return (
    <EditorContext
      value={{
        members: memberList,
      }}
    >
      <div className="row">
        <Suspense fallback={<Loading title="Загрузка редактора" />}>
          <div className="d-flex flex-column col-6 pt-5 gap-4">
            <h2>Форма добавления участника</h2>

            <EditorForm saveMember={saveUser}>
              <Button variant="primary" type="submit">
                Добавить или изменить участника
              </Button>
            </EditorForm>
          </div>
        </Suspense>

        <Suspense fallback={<Loading title={"JSON сейчас отобразится"} />}>
          <EditorJson />
        </Suspense>

        <Suspense fallback={<Loading title="Загрузка просмотрщика" />}>
          <div className="col-12">
            <h2 className="mt-5 mb-4">Просмотрщик данных</h2>

            <EditorView openEditor={openModal} deleteMember={deleteUser} />
          </div>
        </Suspense>

        <Modal
          show={isOpenModal}
          backdrop="static"
          keyboard={false}
          onHide={() => setOpenModal(!isOpenModal)}
        >
          <Modal.Header>
            <Modal.Title>
              Настройка пользователя {currentMember?.name} (@
              {currentMember?.tag.toLowerCase()})
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditorForm saveMember={saveUser} currentMember={currentMember}>
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
            <Button variant="secondary" onClick={closeModal}>
              Отмена
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                (
                  document.querySelector(
                    `#${modalSubmitId}`
                  ) as HTMLButtonElement
                ).click();
                closeModal();
              }}
            >
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </EditorContext>
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
