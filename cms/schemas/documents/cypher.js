export default {
  name: "cypher",
  title: "Cypher",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "For example: Cypher 009 (Curated By Renraku)",
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
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "isActive",
      title: "Cypher Active",
      type: "boolean",
    },
    {
      name: "publishedAt",
      title: "Publish Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "imageSquare",
      title: "Square Image",
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
    {
      name: "packLink",
      title: "Pack Link",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "submissionFormLink",
      title: "Submission Form Link",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
  orderings: [
    {
      title: "Announcement Date",
      name: "announcedAtDesc",
      by: [{ field: "announcementFields.announcedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "imageSquare",
    },
  },
};
