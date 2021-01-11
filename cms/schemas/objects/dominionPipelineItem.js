export default {
  name: "dominionPipelineItem",
  title: "Dominion Pipeline Item",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "completed",
      title: "Completed",
      type: "boolean",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};
