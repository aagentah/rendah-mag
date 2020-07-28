export default {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  fields: [
    {
      name: "logo",
      type: "image",
      title: "Logo",
      validation: Rule => Rule.required(),
    },
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: Rule => Rule.required().max(60),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "Describe your website for search engines and social media.",
      validation: Rule => Rule.required().min(50).max(160),
    },
    {
      name: "keywords",
      type: "array",
      title: "Keywords",
      description: "Add keywords that describes your portfolio.",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      },
      validation: Rule => Rule.required(),
    },
    {
      type: "object",
      name: "socialHandles",
      title: "Social Media URLs",
      fieldsets: [
        {
          name: "social",
          description: 'Include full URL'
        }
      ],
      fields: [
        {
          name: "twitter",
          title: "Twitter Handle",
          type: "string",
          fieldset: "social"
        },
        {
          name: "instagram",
          title: "Instagram Handle",
          type: "string",
          fieldset: "social"
        },
        {
          name: "facebook",
          title: "Facebook Handle",
          type: "string",
          fieldset: "social"
        }
      ]
    }
  ]
};
