export default {
  name: "creations",
  title: "Creations",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Article Title",
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
    // {
    //   name: "showAuthor",
    //   title: "Show Author",
    //   type: "boolean",
    // },
    // {
    //   name: "author",
    //   title: "Author",
    //   type: "reference",
    //   to: { type: "author" },
    //   validation: (Rule) => Rule.required(),
    // },
    {
      name: "authors",
      title: "Authors",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "author" },
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Publish Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
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
      ],
      validation: (Rule) => Rule.required(),
    },
    // {
    //   name: 'categories',
    //   title: 'Categories',
    //   type: 'array',
    //   of: [{type: 'reference', to: {type: 'category'}}]
    // },
    {
      title: "Tags",
      name: "tags",
      description: "Tags used to serve recomendations",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Producer", value: "Producer" },
              { title: "DJ", value: "DJ" },
              { title: "Visual Artist", value: "Visual Artist" },
              { title: "Label", value: "Label" },
              { title: "Listener", value: "Listener" },
              { title: "Developer", value: "Developer" },
              { title: "Engineer", value: "Engineer" },
            ],
            layout: "dropdown",
          },
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
      name: "excerpt",
      title: "Excerpt",
      description:
        "A short description of the item, typically around 50-160 characters.",
      type: "text",
      validation: (Rule) => Rule.required().min(50).max(160),
    },
    {
      name: "publicBody",
      title: "Public Body",
      description: "Available to public (Usually the introduction)",
      type: "blockContent",
    },
    {
      name: "body",
      title: "Article Body",
      description: "Exlusive to Dominion members, otherwise hidden by paywall",
      type: "blockContent",
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
