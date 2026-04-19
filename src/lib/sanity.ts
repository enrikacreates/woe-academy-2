import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Coerce null/empty-array into undefined so component destructure defaults apply.
const u = <T>(v: T | null | undefined): T | undefined => {
  if (v === null || v === undefined) return undefined;
  if (Array.isArray(v) && v.length === 0) return undefined;
  return v;
};

export async function getChromeProps() {
  const settings = await sanityClient.fetch(queries.siteSettings);
  const logoImage = settings?.logo ? urlFor(settings.logo).width(200).quality(90).url() : undefined;
  const footerAddress = settings?.address
    ? `${settings.address}${settings.serviceAreas ? '\n' + settings.serviceAreas : ''}`
    : undefined;

  return {
    settings,
    logoImage,
    headerProps: {
      logoImage,
      logoAlt: u(settings?.logoAlt),
      title: u(settings?.headerTitle),
      subtitle: u(settings?.headerSubtitle),
    },
    footerProps: {
      logoImage,
      logoAlt: u(settings?.logoAlt),
      brandName: u(settings?.footerBrandName),
      brandSuffix: u(settings?.footerBrandSuffix),
      tagline: u(settings?.footerTagline),
      quickLinksHeading: u(settings?.footerQuickLinksHeading),
      quickLinks: u(settings?.footerQuickLinks),
      programsHeading: u(settings?.footerProgramsHeading),
      programs: u(settings?.footerPrograms),
      contactHeading: u(settings?.footerContactHeading),
      phone: u(settings?.phone),
      email: u(settings?.email),
      address: footerAddress,
      copyright: u(settings?.footerCopyright),
    },
  };
}

// GROQ queries
export const queries = {
  allPosts: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
  }`,

  postBySlug: `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
  }`,

  siteSettings: `*[_type == "siteSettings"][0] {
    logo,
    logoAlt,
    headerTitle,
    headerSubtitle,
    heroHeadline,
    heroDescription,
    heroImage,
    heroButtonText,
    heroTrustIndicators[]{ _key, text },
    aboutHeading,
    aboutDescription,
    aboutImage,
    aboutMissionQuote,
    aboutMissionStatement,
    aboutFeatures[]{ _key, text },
    aboutButtonText,
    aboutStats[]{ _key, value, label },
    programsSectionLabel,
    programsSectionHeading,
    programsSectionDescription,
    programsFeatureCards[]{ _key, icon, title, description },
    programsSubheading,
    programItems[]{ _key, emoji, title, ageRange },
    contactSectionLabel,
    contactSectionHeading,
    contactSectionDescription,
    phone,
    email,
    address,
    serviceAreas,
    hours,
    footerBrandName,
    footerBrandSuffix,
    footerTagline,
    footerQuickLinksHeading,
    footerQuickLinks[]{ _key, label, href },
    footerProgramsHeading,
    footerPrograms[]{ _key, text },
    footerContactHeading,
    footerCopyright
  }`,
};
