export default {
  name: "dominionPipeline",
  title: "Dominion Pipeline",
  type: "document",
  fields: [
    {
      title: "Items",
      name: "items",
      type: "array",
      of: [
        {
          title: "Item",
          type: "dominionPipelineItem",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};
