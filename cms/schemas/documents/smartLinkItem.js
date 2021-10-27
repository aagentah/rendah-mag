export default {
  title: "Smart Link Item",
  name: "smartLinkItem",
  type: "object",
  fields: [
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Rendah Mag", value: "rendah-mag" },
          { title: "SoundCloud", value: "soundcloud" },
          { title: "Youtube", value: "youtube" },
          { title: "Facebook", value: "facebook" },
          { title: "Instagram", value: "instagram" },
          { title: "Other Web", value: "web" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Document Reference",
      name: "documentInternal",
      type: "reference",
      hidden: ({ document, parent, value }) => parent?.type !== "rendah-mag",
      to: [{ type: "post" }],
    },
    {
      name: "url",
      title: "URL",
      type: "string",
      hidden: ({ document, parent, value }) => parent?.type === "rendah-mag",
    },
  ],
};
