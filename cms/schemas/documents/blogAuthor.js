export default {
  name: "author",
  title: "Author",
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
      name: "active",
      title: "Active",
      type: "boolean",
    },
    {
      name: "coreTeam",
      title: "Core Team Member",
      type: "boolean",
    },
    {
      name: "alias",
      title: "Alias",
      type: "string",
    },
    {
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "discordId",
      title: "Discord ID",
      type: "string",
    },
    {
      name: "order",
      title: "Order",
      description: "Between 1-3",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
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
      name: "description",
      title: "Author Description",
      type: "text",
      validation: (Rule) => Rule.required().max(300),
    },
    {
      type: "object",
      name: "socialHandles",
      title: "Social Media Handles",
      fieldsets: [
        {
          name: "social",
          description: 'Do not include "@" symbol',
        },
      ],
      fields: [
        {
          name: "twitter",
          title: "Twitter Handle",
          type: "string",
          fieldset: "social",
        },
        {
          name: "instagram",
          title: "Instagram Handle",
          type: "string",
          fieldset: "social",
        },
        {
          name: "facebook",
          title: "Facebook Handle",
          type: "string",
          fieldset: "social",
        },
        {
          name: "soundcloud",
          title: "SoundCloud Handle",
          type: "string",
          fieldset: "social",
        },
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
