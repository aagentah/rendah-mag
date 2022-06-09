export default {
  name: "pack",
  title: "Pack",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: Rule => Rule.required()
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
              { title: "1920px", value: "1920" }
            ],
            layout: "radio"
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent"
    },
    {
      name: "folder",
      title: "Folder",
      type: "file",
      options: {
        accept: ".zip"
      },
      validation: Rule => Rule.required()
    },
    {
      name: "publishedAt",
      title: "Publish Date",
      type: "date",
      validation: Rule => Rule.required()
    }
  ],
  initialValue: () => ({
    publishedAt: new Date()
  }),
  preview: {
    select: {
      title: "title"
    }
  }
};
