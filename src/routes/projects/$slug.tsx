import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { getProject } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-ink text-sand">
      <CustomCursor />
      <Navbar />
      <main>
        <section className="relative flex min-h-[75vh] items-end overflow-hidden pt-28">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,oklch(0.16_0.006_60/0.86),transparent_75%)]" />
          <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-14 text-white md:px-12 md:pb-20">
            <Link
              to="/"
              hash="projects"
              className="text-[10px] uppercase tracking-[0.3em] text-white/75 hover:text-white"
            >
              Back to projects
            </Link>
            <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-white/65">
              {project.location} / {project.year}
            </p>
            <h1 className="mt-4 font-display text-6xl leading-none md:text-9xl">{project.title}</h1>
          </div>
        </section>
        <section className="mx-auto grid max-w-[1600px] gap-14 px-6 py-24 md:grid-cols-[0.75fr_1.25fr] md:px-12">
          <div>
            <p className="eyebrow">Project details</p>
            <dl className="mt-7 space-y-5 border-t border-sand/15 pt-6 text-sm">
              <div className="flex justify-between gap-6">
                <dt className="text-sand/55">Location</dt>
                <dd>{project.location}</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-sand/55">Area</dt>
                <dd>{project.area}</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-sand/55">Scope</dt>
                <dd>Interior and furniture design</dd>
              </div>
            </dl>
          </div>
          <div>
            <p className="font-display text-3xl leading-relaxed md:text-5xl">{project.intro}</p>
            <div className="mt-12 border-t border-sand/15 pt-7">
              <p className="eyebrow">Designed rooms</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.rooms.map((room) => (
                  <span
                    key={room}
                    className="border border-sand/20 px-4 py-2 text-[10px] uppercase tracking-[0.18em]"
                  >
                    {room}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
