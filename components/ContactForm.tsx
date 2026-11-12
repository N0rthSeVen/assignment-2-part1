"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/contact-me-server-form/actions";
import { initialContactFormState } from "@/lib/contact/form-state";

const labelClasses =
  "block text-sm font-medium text-zinc-950 dark:text-zinc-50";
const inputClasses =
  "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50";
const errorClasses = "mt-1 text-sm text-red-600 dark:text-red-400";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialContactFormState
  );

  const values = state.values ?? { name: "", email: "", message: "" };

  return (
    <form
      key={state.status === "success" ? "sent" : "editing"}
      action={formAction}
      noValidate
      className="space-y-5"
    >
      {state.status === "success" && (
        <p
          role="status"
          className="rounded-lg border border-green-600 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-500 dark:bg-green-950 dark:text-green-400"
        >
          {state.message}
        </p>
      )}

      {state.status === "save-error" && (
        <p
          role="alert"
          className="rounded-lg border border-red-600 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500 dark:bg-red-950 dark:text-red-400"
        >
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="name" className={labelClasses}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={values.name}
          className={inputClasses}
        />
        {state.errors?.name && (
          <p className={errorClasses}>{state.errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={values.email}
          className={inputClasses}
        />
        {state.errors?.email && (
          <p className={errorClasses}>{state.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={values.message}
          className={inputClasses}
        />
        {state.errors?.message && (
          <p className={errorClasses}>{state.errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
