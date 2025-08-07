import { lazy, Suspense } from "react";
import { Spinner } from "react-bootstrap";

const Editor = lazy(() => import("./components/editor"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="container-md">
        <Editor />
      </div>
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="w-100 h-100 d-inline-flex justify-content-center align-items-center">
      <Spinner className="my-auto" animation="border" variant="primary" />
    </div>
  );
}

export default App;
