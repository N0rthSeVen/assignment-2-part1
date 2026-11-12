export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export type ContactValidationResult =
  | { ok: true; data: ContactFormData }
  | { ok: false; errors: FieldErrors };

export function validateContactForm(
  input: ContactFormData
): ContactValidationResult {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const message = input.message.trim();
  const email = input.email;

  if (name.length === 0) {
    errors.name = "Name is required.";
  }

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  if (message.length === 0) {
    errors.message = "Message is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data: { name, email, message } };
}

function validateEmail(email: string): string | undefined {
  if (email.length === 0) {
    return "Email is required.";
  }
  if (/\s/.test(email)) {
    return "Email must not contain whitespace.";
  }
  const atCount = email.split("@").length - 1;
  if (atCount === 0) {
    return "Email must contain an @.";
  }
  if (atCount > 1) {
    return "Email must contain exactly one @.";
  }
  const [local, domain] = email.split("@");
  if (local.length === 0) {
    return "Email must include text before the @.";
  }
  if (
    !domain.includes(".") ||
    domain.split(".").some((label) => label.length === 0)
  ) {
    return "Email must include a valid domain after the @ (e.g. example.com).";
  }
  return undefined;
}
