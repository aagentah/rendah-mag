export default {
  name: "refTag",
  title: "Tag",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Visual Artist", value: "visual-artist" },
          { title: "Music Artist", value: "music-artist" },
          { title: "Label", value: "label" },
          { title: "Event", value: "event" },
        ],
        layout: "radio",
      },
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
