import React from "react";
const Form = React.lazy(() => import("../components/Form"));
const LoginPage = React.lazy(() => import("../components/Login"));
const PreviewForm = React.lazy(() => import("../components/PreviewForm"));
const ListForms = React.lazy(() => import("../components/ListForms"));

export const routes = {
  "/": () => <ListForms />,
  "/login": () => <LoginPage />,
  "/forms/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
  "/forms/:id/preview": ({ id }: { id: string }) => (
    <PreviewForm id={Number(id)} />
  ),
};
