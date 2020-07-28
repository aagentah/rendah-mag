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
      title: "URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      validation: Rule => Rule.required()
    },
    {
      name: "featured",
      title: "Featured Article",
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
      validation: Rule => Rule.required()
    },
    // {
    //   name: 'categories',
    //   title: 'Categories',
    //   type: 'array',
    //   of: [{type: 'reference', to: {type: 'category'}}]
    // },
    {
      name: "description",
      title: "Article Description",
      type: "text",
      validation: Rule => Rule.required().max(300)
    },
    {
      name: "body",
      title: "Article Body",
      type: "blockContent"
    },
    {
      type: "object",
      name: "socialHandles",
      title: "Social Media Handles",
      fieldsets: [
        {
          name: "social",
          description: 'Do not include "@" symbol'
        }
      ],
      fields: [
        {
          name: "twitter",
          title: "Twitter Handle",
          type: "string",
          fieldset: "social"
        },
        {
          name: "instagram",
          title: "Instagram Handle",
          type: "string",
          fieldset: "social"
        },
        {
          name: "facebook",
          title: "Facebook Handle",
          type: "string",
          fieldset: "social"
        },
        {
          name: "soundcloud",
          title: "SoundCloud Handle",
          type: "string",
          fieldset: "social"
        }
      ]
    }
  ],

  orderings: [
    {
      title: 'Publish Date',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
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
