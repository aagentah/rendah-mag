export default {
  name: "dominionResource",
  title: "dominionResource",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "subtitle",
      title: "Sub Title",
      type: "string",
    },
    {
      name: "from",
      title: "From (Author name)",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "activeFrom",
      title: "Active From",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Image",
      type: "image",
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Audio", value: "audio" },
          { title: "Images", value: "images" },
          { title: "Videos", value: "videos" },
          { title: "Article", value: "article" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
    {
      name: "attachments",
      title: "Attachments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "file",
              title: "File",
              type: "file",
              options: {
                accept:
                  ".jpg,.jpeg,.png,.gif,.webp,.bmp,.tiff,.svg,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.wav,.mp3,.mp4,.avi,.mov,.mkv,.flv,.webm",
              },
              hidden: ({ parent }) => !!parent?.url,
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https"],
                }),
              hidden: ({ parent }) => !!parent?.file,
            },
          ],
          preview: {
            select: {
              title: "title",
              file: "file",
              url: "url",
            },
            prepare(selection) {
              const { title, file, url } = selection;
              const subtitle = file
                ? `File: ${file.asset.mimeType}`
                : `URL: ${url}`;
              return {
                title,
                subtitle,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
  },
};