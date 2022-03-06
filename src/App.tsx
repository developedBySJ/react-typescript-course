import React from "react";
import { AppContainer } from "./AppContainer";
import { Header } from "./Header";

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
];

function App() {
  return (
    <AppContainer>
      <div className="w-full max-w-md px-4 rounded-2xl bg-gray-900">
        <Header title="Welcome to Dark Theme" />
        {formFields.map(({ id, label, type }) => (
          <div key={id} className="flex flex-col my-2 mb-4">
            <label className="text-left mb-2">{label}</label>
            <input
              className="border-2 bg-gray-800 border-gray-700 rounded-lg p-2 w-full"
              type={type}
            />
          </div>
        ))}

        <button className="py-3 px-8 rounded-lg bg-purple-500 mb-8">
          Submit
        </button>
      </div>
    </AppContainer>
  );
}

export default App;
