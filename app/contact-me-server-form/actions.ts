"use server";

import { appendContactSubmission } from "@/lib/contact/store";
import type { ContactFormState } from "@/lib/contact/form-state";
import { validateContactForm } from "@/lib/contact/validation";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const result = validateContactForm(raw);

  if (!result.ok) {
    return {
      status: "validation-error",
      errors: result.errors,
      values: raw,
    };
  }

  try {
    await appendContactSubmission(result.data);
  } catch {
    return {
      status: "save-error",
      message:
        "Something went wrong while saving your message. Please try again.",
      values: raw,
    };
  }

  return {
    status: "success",
    message: "Thanks! Your message has been sent successfully.",
  };
}
