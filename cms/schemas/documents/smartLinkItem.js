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
          { title: "SoundCloud", value: "soundcloud" },
          { title: "Youtube", value: "youtube" },
          { title: "Facebook", value: "facebook" },
          { title: "Instagram", value: "instagram" },
          { title: "Rendah Mag", value: "rendah-mag" },
          { title: "Other Web", value: "web" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "url",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
