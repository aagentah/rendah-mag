// Define your admin users
const adminUsers = ["Dan Jones"]; // Ensure this matches the currentUser's name

export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Article Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: "slug",
      title: "Slug",
      description: "The URL of the article (Try to keep short as possible).",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug) {
            return true;
          }
          const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
          return regex.test(slug.current)
            ? true
            : "Slug must be lowercase and contain only alphanumeric characters and hyphens.";
        }),
    },
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "divisions",
      title: "Divisions",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "division" },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tag",
      title: "Tag",
      type: "reference",
      to: { type: "gallery" },
      hidden: ({ document }) => {
        return !document.divisions?.some(
          (division) => division._ref === "bad8cd79-c94d-4fcf-8011-ab4e4a23f21d"
        );
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "category" },
        },
      ],
      validation: (Rule) => Rule.required(),
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
          name: "caption",
          title: "Source / Caption",
          type: "blockContent",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "socialTagline",
      title: "Social Tagline",
      description: "Short description for social media SEO.",
      type: "string",
      validation: (Rule) => Rule.required().max(70),
    },
    {
      name: "introduction",
      title: "Introduction",
      description: "Shown as first paragraph in the article.",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "body",
      title: "Article Body",
      description: "Everything after the description.",
      type: "blockContent",
    },
    {
      type: "object",
      name: "socialHandles",
      title: "Social Media Handles",
      fieldsets: [
        {
          name: "social",
        },
      ],
      fields: [
        {
          name: "twitter",
          title: "Twitter Handle",
          description: 'Do not include "@" symbol.',
          type: "string",
          fieldset: "social",
        },
        {
          name: "instagram",
          title: "Instagram Handle",
          description: 'Do not include "@" symbol.',
          type: "string",
          fieldset: "social",
        },
        {
          name: "facebook",
          title: "Facebook Handle",
          description: 'Do not include "@" symbol.',
          type: "string",
          fieldset: "social",
        },
        {
          name: "soundcloud",
          title: "SoundCloud Handle",
          description: 'Do not include "@" symbol.',
          type: "string",
          fieldset: "social",
        },
      ],
    },
    {
      name: "hasPostedDiscord",
      title: "Has Posted in Discord",
      type: "boolean",
      hidden: ({ currentUser }) => !adminUsers.includes(currentUser?.name),
    },
    {
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      hidden: ({ currentUser }) => !adminUsers.includes(currentUser?.name),
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
      return {
        ...selection,
        subtitle: author && `by ${author}`,
      };
    },
  },
};
