import ContactForm from "@/components/ContactForm";

export default function ContactMeServerForm() {
  return (
    <div className="w-full px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Contact Me
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Send me a message and I&apos;ll get back to you.
        </p>
        <div className="mt-10 rounded-xl border border-zinc-200 p-6 sm:p-8 dark:border-zinc-800">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
