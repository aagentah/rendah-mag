export default {
  name: "homePage",
  type: "document",
  title: "Home Page",
  fields: [
    {
      name: "heroImage",
      type: "image",
      title: "Hero Image",
      fields: [
        {
          name: "resize",
          title: "Resize",
          type: "string",
          options: {
            list: [
              { title: "None", value: "none" },
              { title: "1080px", value: "1080" },
              { title: "1920px", value: "1920" }
            ],
            layout: "radio"
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: "heroTitle",
      type: "string",
      title: "Hero Title",
      description: "Title of page. For example: Home",
      validation: Rule => Rule.required().max(60)
    },
    {
      name: "heroDescription",
      type: "string",
      title: "Hero Description",
      description: "Describe your page for search engines and social media."
    },
    {
      name: "heroLabel",
      type: "string",
      title: "Hero Label",
      description: "Describe your page for search engines and social media."
    },
    {
      name: "heroLink",
      type: "string",
      title: "Hero Link",
      description: "Describe your page for search engines and social media."
    }
  ]
};
