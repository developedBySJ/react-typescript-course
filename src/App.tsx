import React from "react";
import { AppContainer } from "./AppContainer";
import { Form } from "./Form";
import { Header } from "./Header";

function App() {
  const [page, setPage] = React.useState("HOME");
  const openForm = () => setPage("FORM");
  const closeForm = () => setPage("HOME");

  return (
    <AppContainer>
      <div className="w-full max-w-md px-4 rounded-2xl bg-gray-900">
        <Header title="Welcome to Dark Theme" />

        {page === "HOME" ? (
          <button onClick={openForm} className="btn mb-8 mx-4">
            Go to Form
          </button>
        ) : (
          <Form onClose={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
