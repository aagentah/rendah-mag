export default {
  name: "track",
  title: "Track",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "file",
      title: "File",
      type: "file",
      options: {
        accept: "audio/*",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "isOffering",
      title: "Offering",
      type: "boolean",
    },
    {
      name: "allowDownload",
      title: "Allow Download",
      type: "boolean",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
