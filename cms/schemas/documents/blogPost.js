export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Article Title",
      type: "string",
      validation: Rule => Rule.required().max(60)
    },
    {
      name: "slug",
      title: "Slug",
      description: "The URL of the article (Try to keep short as possible).",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: Rule => Rule.required()
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
          to: { type: "author" }
        }
      ]
    },
    // {
    //   name: "tags",
    //   title: "Tags",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: { type: "refTag" }
    //     }
    //   ]
    // },
    {
      name: "featured",
      title: "Featured Article",
      description: "Feature on the big Homepage Hero banner.",
      type: "boolean"
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "category" },
      validation: Rule => Rule.required()
    },
    {
      name: "publishedAt",
      title: "Publish Date",
      type: "datetime",
      validation: Rule => Rule.required()
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
              { title: "1920px", value: "1920" }
            ],
            layout: "radio"
          }
        },
        {
          name: "caption",
          title: "Source / Caption",
          type: "blockContent",
          required: "false"
        }
      ],
      validation: Rule => Rule.required()
    },
    // {
    //   name: 'categories',
    //   title: 'Categories',
    //   type: 'array',
    //   of: [{type: 'reference', to: {type: 'category'}}]
    // },
    {
      name: "socialTagline",
      title: "Social Tagline",
      description: "Short description for social media SEO.",
      type: "string",
      validation: Rule => Rule.required().max(70)
    },
    // {
    //   name: "description",
    //   title: "Article Description",
    //   description: "Shown as first paragraph in the article.",
    //   type: "text",
    //   validation: (Rule) => Rule.required().max(300),
    // },
    {
      name: "introduction",
      title: "Introduction",
      description: "Shown as first paragraph in the article.",
      type: "array",
      of: [{ type: "block" }]
    },
    {
      name: "body",
      title: "Article Body",
      description: "Everything after the description.",
      type: "blockContent"
    },
    {
      type: "object",
      name: "socialHandles",
      title: "Social Media Handles",
      fieldsets: [
        {
          name: "social"
        }
      ],
      fields: [
        {
          name: "twitter",
          title: "Twitter Handle",
          description: 'Do not include "@" symbol.',
          type: "string",
          fieldset: "social"
        },
        {
          name: "instagram",
          title: "Instagram Handle",
          description: 'Do not include "@" symbol.',
          type: "string",
          fieldset: "social"
        },
        {
          name: "facebook",
          title: "Facebook Handle",
          description: 'Do not include "@" symbol.',
          type: "string",
          fieldset: "social"
        },
        {
          name: "soundcloud",
          title: "SoundCloud Handle",
          description: 'Do not include "@" symbol.',
          type: "string",
          fieldset: "social"
        }
      ]
    },
    {
      name: "hasPostedDiscord",
      title: "Has Posted in Discord",
      type: "boolean"
    }
  ],
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  }),
  orderings: [
    {
      title: "Publish Date",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }]
    }
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "image"
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      });
    }
  }
};
