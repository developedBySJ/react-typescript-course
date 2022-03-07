import React, { useState } from "react";
import { AppContainer } from "./AppContainer";
import { Form } from "./Form";
import { Header } from "./Header";
import { ListForms } from "./ListForms";

function App() {
  const [page, setPage] = React.useState("HOME");
  const [curFormId, setCurFormId] = useState<number>(-1);
  const openForm = (id: number) => setCurFormId(id);
  const closeForm = () => setCurFormId(-1);

  return (
    <AppContainer>
      <div className="w-full max-w-md px-4 rounded-2xl bg-gray-900">
        <Header title="Welcome to Dark Theme" />

        {curFormId > 0 ? (
          <Form id={curFormId} onClose={closeForm} />
        ) : (
          <>
            <ListForms openForm={openForm} />
            <button
              className="btn my-6 mx-4"
              onClick={() => openForm(new Date().getTime())}
            >
              New Form
            </button>
          </>
        )}
      </div>
    </AppContainer>
  );
}

export default App;
