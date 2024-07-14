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
    {
      name: "coverImage",
      title: "Image",
      type: "image",
    },
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
    {
      name: "attachments",
      title: "Attachments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "file",
              title: "File",
              type: "file",
              options: {
                accept: "any",
              },
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https"],
                }),
            },
          ],
          preview: {
            select: {
              title: "title",
              file: "file",
              url: "url",
            },
            prepare(selection) {
              const { title, file, url } = selection;
              const subtitle = file
                ? `File: ${file.asset.mimeType}`
                : `URL: ${url}`;
              return {
                title,
                subtitle,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
  },
};
