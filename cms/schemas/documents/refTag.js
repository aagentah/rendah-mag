// import musicLink from "./musicLink"; // Adjust the path as necessary
// import customImage from "./customImage"; // Adjust the path as necessary

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
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [
        { type: "block" },
        // { type: "musicLink" },
        // { type: "customImage" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
