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
    hours
  }`,
};
