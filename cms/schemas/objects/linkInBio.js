export default {
  name: "linkInBio",
  title: "Link In Bio",
  type: "document",
  fields: [
    {
      title: "Items",
      name: "items",
      type: "array",
      of: [
        {
          title: "Item",
          type: "linkInBioItem",
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
