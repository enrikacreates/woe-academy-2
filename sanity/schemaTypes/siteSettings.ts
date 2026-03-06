import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Heading',
      type: 'string',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas',
      type: 'string',
      description: 'e.g. Irvine, Tustin Ranch & Woodbridge',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
