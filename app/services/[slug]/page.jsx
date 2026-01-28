import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import { SERVICES, getServiceBySlug } from "@/constants/services";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams?.slug);
  if (!service) return {};
  return {
    title: service.meta?.title,
    description: service.meta?.description,
    keywords: service.meta?.keywords,
  };
}

export default async function ServicePage({ params }) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams?.slug);
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
