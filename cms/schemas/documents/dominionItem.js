export default {
  name: "dominionItem",
  title: "Dominion Item",
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
    },
    {
      name: "emailDescription",
      title: "Email Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "mainDescription",
      title: "Main Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "activeFrom",
      title: "Active From",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};
