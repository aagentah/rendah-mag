export default {
  name: "gallery",
  title: "Gallery",
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
    //       to: { type: "refTag" },
    //     },
    //   ],
    // },
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
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: "socialTagline",
      title: "Social Tagline",
      description:
        "A short tagline for social media cards, typically around maximum of 70 characters",
      type: "string",
      validation: Rule => Rule.required().max(70)
    },
    {
      name: "introduction",
      title: "Introduction",
      description: "Shown as first paragraph in the article.",
      type: "blockContent"
    },
    {
      name: "components",
      title: "Components",
      type: "array",
      of: [
        {
          name: "galleryBanner",
          title: "Banner",
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              fields: [
                {
                  name: "caption",
                  title: "Source / Caption",
                  type: "blockContent",
                  required: "false"
                },
                {
                  name: "dominionExclusive",
                  title: "Dominion Exclusive",
                  type: "boolean"
                }
              ],
              validation: Rule => Rule.required()
            }
          ]
        },
        {
          name: "galleryTextImage",
          title: "Text Image",
          type: "object",
          fields: [
            {
              name: "align",
              title: "Align",
              type: "string",
              options: {
                list: [
                  { title: "Left", value: "left" },
                  { title: "Right", value: "right" }
                ],
                layout: "radio"
              },
              validation: Rule => Rule.required()
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
                  required: "false"
                },
                {
                  name: "dominionExclusive",
                  title: "Dominion Exclusive",
                  type: "boolean"
                }
              ],
              validation: Rule => Rule.required()
            },
            {
              name: "text",
              title: "Text",
              type: "blockContent"
            }
          ]
        }
      ]
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "refTag" }
        }
      ]
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
