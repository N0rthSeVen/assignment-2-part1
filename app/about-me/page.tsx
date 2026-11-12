const education = {
  degree: "MS in Business Analytics",
  school: "Santa Clara University",
  meta: "Expected graduation: December 2026",
  points: [
    "Dean's List, Spring 2026",
    "Focused on data analytics, with longer-term interests in quantitative finance and AI.",
  ],
};

const experience = [
  {
    role: "Data Analyst Intern",
    company: "Wefluens",
    meta: "Jul – Sep 2026 · Remote",
    points: [
      "Built internal tooling that collects campaign performance data and turns it into client-ready reports.",
    ],
  },
  {
    role: "Business Analyst Intern",
    company: "Capgemini",
    meta: "Beijing, China",
    points: [
      "Built Power BI and Tableau dashboards for internal stakeholders.",
      "Supported a 20,000+ record CRM migration.",
    ],
  },
  {
    role: "Industry Research Intern",
    company: "SCGC",
    meta: "",
    points: ["Analyzed 16,000+ data points for three sector reports."],
  },
];

const skills = [
  "Python",
  "SQL",
  "R",
  "Tableau",
  "Power BI",
  "Excel",
  "PuLP optimization",
  "Git",
];

export default function AboutMe() {
  return (
    <div className="w-full px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          About Me
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          I&apos;m Xipeng (Mars) Ma, a data analyst studying Business Analytics
          at Santa Clara University.
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            Education
          </h2>
          <div className="mt-4 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">
                {education.degree}
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {education.meta}
              </span>
            </div>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              {education.school}
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {education.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            Experience
          </h2>
          <div className="mt-4 space-y-4">
            {experience.map((job) => (
              <div
                key={job.company}
                className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">
                    {job.role} · {job.company}
                  </h3>
                  {job.meta && (
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {job.meta}
                    </span>
                  )}
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            Skills
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
