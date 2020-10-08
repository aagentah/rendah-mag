export default {
  name: "homePage",
  type: "document",
  title: "Home Page",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "Title of page. For example: Home",
      validation: Rule => Rule.required().max(60),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "Describe your page for search engines and social media.",
      validation: Rule => Rule.required().min(50).max(160),
    },
    {
      name: "components",
      title: "Components",
      type: "array",
      of: [
        {
          title: "Text Block",
          type: "textBlock"
        },
        {
          title: "Author",
          type: "author"
        }
      ]
    }
  ]
};
