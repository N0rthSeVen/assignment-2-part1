# Personal Portfolio — ISBA 2438 Assignment 2, Part 1

A personal portfolio built with [Next.js](https://nextjs.org) (App Router), TypeScript, and Tailwind CSS for Xipeng (Mars) Ma.

## Getting Started

Requires Node 20+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. A production build can be tested with `npm run build && npm run start`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page: short intro, buttons to `/projects` and `/contact-me-server-form`, and cards for featured projects. |
| `/about-me` | Education, experience, and skills. |
| `/projects` | Lists all projects as cards. |
| `/projects/product-inventory-cli` | Detail page for **Product Inventory CLI** (ISBA 2438 Assignment 1). |
| `/projects/urban-logistics-optimization` | Detail page for **Sustainable Urban Logistics Optimization** (ISBA 2405 Project 1). |
| `/projects/[anything-else]` | Unknown slug: `notFound()` returns a real **404 status** with the "Project not found" page and a link back to `/projects`. |
| `/contact-me-server-form` | Contact page whose form is submitted to a Server Action. |

The shared navigation bar (`components/NavBar.tsx`) highlights the active link on every route.

## Project Structure

```
assignment-2-part1/
├── app/
│   ├── layout.tsx                      # Root layout with the NavBar
│   ├── page.tsx                        # Landing page
│   ├── about-me/page.tsx
│   ├── projects/
│   │   ├── page.tsx                    # Project list
│   │   └── [slug]/
│   │       ├── page.tsx                # Detail page (generateStaticParams + notFound())
│   │       └── not-found.tsx           # "Project not found" UI
│   └── contact-me-server-form/
│       ├── page.tsx                    # Contact page
│       └── actions.ts                  # "use server" Server Action
├── components/
│   ├── NavBar.tsx
│   ├── ProjectCard.tsx
│   └── ContactForm.tsx
├── lib/
│   ├── projects.ts                     # Project data: getAllProjects(), getProjectBySlug()
│   └── contact/
│       ├── form-state.ts               # Shared ContactFormState type
│       ├── validation.ts               # validateContactForm()
│       └── store.ts                    # appendContactSubmission()
└── data/
    └── contact-submissions.json        # Committed as []; backups and temp files are gitignored
```

## Contact Form Flow

The contact form is handled entirely on the server. The files involved, in order:

1. **`components/ContactForm.tsx` (client component).** `useActionState(submitContactForm, initialContactFormState)` binds the form to the Server Action and exposes a `pending` flag that disables the submit button while sending. The form has `noValidate`, so browser validation is off and every rule runs on the server. Inputs are uncontrolled (`defaultValue` populated from the last returned state), so after a validation error the user's typed values are still there; on success the form remounts (via a React `key` change) and clears.

2. **Server Action — `app/contact-me-server-form/actions.ts`.** `submitContactForm(prevState, formData)` reads the raw `name`, `email`, and `message` from the submitted `FormData`, passes them to `validateContactForm`, saves valid data with `appendContactSubmission`, and returns a `ContactFormState`.

3. **Validation — `lib/contact/validation.ts`.** `validateContactForm` trims `name` and `message` and rejects either if blank after trimming. For `email` it requires: non-empty; no whitespace anywhere; exactly one `@`; non-blank text before the `@`; and a domain after the `@` that contains a dot where every dot-separated label is non-blank. It returns `{ ok: true, data }` with the trimmed values, or `{ ok: false, errors }` with per-field error messages.

4. **Storage — `lib/contact/store.ts`.** `appendContactSubmission` enqueues the write onto a module-level promise queue, so submissions arriving at the same time are applied one after another and none are lost. Each write reads the existing JSON array, appends `{ id, name, email, message, createdAt, source: "server-form" }` (UUID `id`, ISO `createdAt`), and writes through a unique temp file followed by an atomic `rename`. A missing file (`ENOENT`) is treated as an empty list; any other read error is rethrown so the action reports a save failure instead of overwriting data. If the file exists but is corrupted (unparsable or not an array), it is first renamed to `contact-submissions.corrupt-<timestamp>.json` as a backup, then the save starts a fresh array.

5. **Returned state — `lib/contact/form-state.ts`.** The action returns `{ status, message?, errors?, values? }` where `status` is one of `idle`, `success`, `validation-error`, or `save-error`.

6. **UI states.** `success` shows a green confirmation banner and clears the form. `validation-error` shows a red per-field error under the offending input while keeping the user's values. `save-error` shows a separate red banner ("Something went wrong while saving your message. Please try again."), also keeping the user's values, clearly distinct from a successful send.

Valid submissions are appended to `data/contact-submissions.json`.
