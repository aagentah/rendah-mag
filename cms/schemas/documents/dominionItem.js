export default {
  name: "dominionItem",
  title: "Newsletter (Dominion)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "from",
      title: "From (Author name)",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      description:
        "https://us17.campaign-archive.com/?u=df0d549f92845c8dfc4d99dde&id=1c39a80d54",
      options: {
        source: "activeFrom",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    // {
    //   name: "image",
    //   title: "Image (Landscape)",
    //   description: "Used on website profile",
    //   type: "image",
    //   fields: [
    //     {
    //       name: "resize",
    //       title: "Resize",
    //       type: "string",
    //       options: {
    //         list: [
    //           { title: "None", value: "none" },
    //           { title: "1080px", value: "1080" },
    //           { title: "1920px", value: "1920" },
    //         ],
    //         layout: "radio",
    //       },
    //     },
    //   ],
    // },
    // {
    //   name: "imagePortrait",
    //   title: "Image",
    //   description: "Used on email",
    //   type: "image",
    //   fields: [
    //     {
    //       name: "resize",
    //       title: "Resize",
    //       type: "string",
    //       options: {
    //         list: [
    //           { title: "None", value: "none" },
    //           { title: "1080px", value: "1080" },
    //           { title: "1920px", value: "1920" },
    //         ],
    //         layout: "radio",
    //       },
    //     },
    //   ],
    // },
    {
      name: "activeFrom",
      title: "Active From",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
        },
      ],
    },
    // {
    //   name: "body",
    //   title: "Body",
    //   type: "blockContent",
    // },
    // {
    //   name: "showInProfile",
    //   title: "Show in profile",
    //   type: "boolean",
    // },
    // {
    //   name: "includeLoginPrompt",
    //   title: "Include Login Prompt",
    //   type: "boolean",
    // },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};
