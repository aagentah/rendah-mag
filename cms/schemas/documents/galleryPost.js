export default {
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Publish Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "galleryImages",
      description: "From oldest to newest",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            {
              name: "resize",
              title: "Resize",
              type: "string",
              options: {
                list: [
                  { title: "None", value: "none" },
                  { title: "1080px", value: "1080" },
                  { title: "1920px", value: "1920" },
                ],
                layout: "radio",
              },
            },
            {
              name: "caption",
              title: "Source / Caption",
              type: "blockContent",
              required: "false",
            },
          ],
        },
      ],
    },
    {
      name: "socialTagline",
      title: "Social Tagline",
      description:
        "A short tagline for social media cards, typically around maximum of 70 characters",
      type: "string",
      validation: (Rule) => Rule.required().max(70),
    },
    {
      name: "introduction",
      title: "Introduction",
      description: "Shown as first paragraph in the article.",
      type: "blockContent",
      validation: (Rule) => Rule.required().max(70),
    },
    {
      type: "object",
      name: "socialHandles",
      title: "Social Media Handles",
      fieldsets: [
        {
          name: "social",
          description: 'Do not include "@" symbol',
        },
      ],
      fields: [
        {
          name: "twitter",
          title: "Twitter Handle",
          type: "string",
          fieldset: "social",
        },
        {
          name: "instagram",
          title: "Instagram Handle",
          type: "string",
          fieldset: "social",
        },
        {
          name: "facebook",
          title: "Facebook Handle",
          type: "string",
          fieldset: "social",
        },
        {
          name: "soundcloud",
          title: "SoundCloud Handle",
          type: "string",
          fieldset: "social",
        },
      ],
    },
  ],
  initialValue: () => ({
    publishedAt: new Date().toISOString(),
  }),
  orderings: [
    {
      title: "Publish Date",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "image",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
