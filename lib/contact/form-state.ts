import type { ContactFormData, FieldErrors } from "./validation";

export type ContactFormState = {
  status: "idle" | "success" | "validation-error" | "save-error";
  message?: string;
  errors?: FieldErrors;
  values?: ContactFormData;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
};
