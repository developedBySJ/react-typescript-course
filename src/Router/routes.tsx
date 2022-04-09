import { Form } from "../components/Form";
import { ListForms } from "../components/ListForms";
import { LoginPage } from "../components/Login";
import { PreviewForm } from "../components/PreviewForm";

export const routes = {
  "/": () => <ListForms />,
  "/login": () => <LoginPage />,
  "/forms/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
  "/forms/:id/preview": ({ id }: { id: string }) => (
    <PreviewForm id={Number(id)} />
  ),
};
