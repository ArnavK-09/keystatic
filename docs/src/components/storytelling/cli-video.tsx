export default function CliVideo() {
  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:pb-12">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">
            Two-way editing, effortlessly
          </h2>

          <p className="mt-4 text-base sm:mt-6">
            Create a new Next.js or Astro project in seconds with the Keystatic
            CLI:
          </p>
        </div>
        <div className="pt-4 md:pt-10">
          <iframe
            className="aspect-video w-full max-w-full rounded-lg shadow"
            src="https://www.youtube.com/embed/E65Fx9all04?controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
