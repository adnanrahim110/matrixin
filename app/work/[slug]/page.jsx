import Link from "next/link";

export default async function WorkProjectPage({ params }) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams?.slug || "");

  return (
    <section data-theme="dark" className="px-8 pb-40 pt-40">
      <h1 className="font-heading text-[7.4rem] leading-[110%]">{slug}</h1>
      <p className="mt-8 max-w-240 text-grey">
        Project page placeholder. If you want, I can build the project detail
        pages to match Estrela too.
      </p>
      <Link
        href="/work"
        className="mt-12 inline-block underline underline-offset-4"
      >
        Back to Work
      </Link>
    </section>
  );
}
