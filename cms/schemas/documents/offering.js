export default {
  name: "offering",
  title: "Offering",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required().max(60)
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent"
    },
    {
      title: "Tracks",
      name: "tracks",
      type: "array",
      of: [
        {
          name: "track",
          title: "Track",
          type: "reference",
          to: { type: "track" },
          validation: Rule => Rule.required()
        }
      ]
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
  orderings: [
    {
      title: "Publish Date",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }]
    }
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "image"
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      });
    }
  }
};
