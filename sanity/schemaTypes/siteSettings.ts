import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fieldsets: [
    {name: 'hero', title: 'Hero Section', options: {collapsible: true}},
    {name: 'about', title: 'About Section', options: {collapsible: true}},
    {name: 'programs', title: 'Programs Section', options: {collapsible: true}},
    {name: 'contact', title: 'Contact Section', options: {collapsible: true}},
  ],
  fields: [
    // ── Hero Section ──
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Hero Button Text',
      type: 'string',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroTrustIndicators',
      title: 'Trust Indicators',
      type: 'array',
      fieldset: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'text', title: 'Text', type: 'string'}),
          ],
          preview: {
            select: {title: 'text'},
          },
        },
      ],
    }),

    // ── About Section ──
    defineField({
      name: 'aboutHeading',
      title: 'About Heading',
      type: 'string',
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Description',
      type: 'text',
      rows: 4,
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Image',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutMissionQuote',
      title: 'Mission Quote',
      type: 'text',
      rows: 2,
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutMissionStatement',
      title: 'Mission Statement',
      type: 'text',
      rows: 4,
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutFeatures',
      title: 'About Features',
      type: 'array',
      fieldset: 'about',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'text', title: 'Text', type: 'string'}),
          ],
          preview: {
            select: {title: 'text'},
          },
        },
      ],
    }),
    defineField({
      name: 'aboutButtonText',
      title: 'About Button Text',
      type: 'string',
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutStats',
      title: 'Stats',
      type: 'array',
      fieldset: 'about',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Value', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        },
      ],
    }),

    // ── Programs Section ──
    defineField({
      name: 'programsSectionLabel',
      title: 'Section Label',
      type: 'string',
      fieldset: 'programs',
    }),
    defineField({
      name: 'programsSectionHeading',
      title: 'Section Heading',
      type: 'string',
      fieldset: 'programs',
    }),
    defineField({
      name: 'programsSectionDescription',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      fieldset: 'programs',
    }),
    defineField({
      name: 'programsFeatureCards',
      title: 'Feature Cards',
      type: 'array',
      fieldset: 'programs',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name: shield, calendar, users, play, graduation',
              options: {
                list: [
                  {title: 'Shield', value: 'shield'},
                  {title: 'Calendar', value: 'calendar'},
                  {title: 'Users', value: 'users'},
                  {title: 'Play', value: 'play'},
                  {title: 'Graduation', value: 'graduation'},
                ],
              },
            }),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'icon'},
          },
        },
      ],
    }),
    defineField({
      name: 'programsSubheading',
      title: 'Programs Subheading',
      type: 'string',
      fieldset: 'programs',
    }),
    defineField({
      name: 'programItems',
      title: 'Program Items',
      type: 'array',
      fieldset: 'programs',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'emoji', title: 'Emoji', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'ageRange', title: 'Age Range / Time', type: 'string'}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'ageRange', media: 'emoji'},
            prepare({title, subtitle, media}) {
              return {title: `${media || ''} ${title || ''}`.trim(), subtitle}
            },
          },
        },
      ],
    }),

    // ── Contact Section ──
    defineField({
      name: 'contactSectionLabel',
      title: 'Section Label',
      type: 'string',
      fieldset: 'contact',
    }),
    defineField({
      name: 'contactSectionHeading',
      title: 'Section Heading',
      type: 'string',
      fieldset: 'contact',
    }),
    defineField({
      name: 'contactSectionDescription',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      fieldset: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      fieldset: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      fieldset: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      fieldset: 'contact',
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'text',
      rows: 2,
      fieldset: 'contact',
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas',
      type: 'string',
      description: 'e.g. Irvine, Tustin Ranch & Woodbridge',
      fieldset: 'contact',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
