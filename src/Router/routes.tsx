import { Form } from "../components/Form";
import { ListForms } from "../components/ListForms";
import { PreviewForm } from "../components/PreviewForm";

export const routes = {
  "/": () => <ListForms />,
  "/forms/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
  "/forms/:id/preview": ({ id }: { id: string }) => (
    <PreviewForm id={Number(id)} />
  ),
};
