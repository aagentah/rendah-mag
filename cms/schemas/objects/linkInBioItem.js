import conditionalFields from "../../components/helpers/conDitionalFields";

export default {
  name: "linkInBioItem",
  title: "Link In Bio Item",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Conditional Field",
      name: "field",
      type: "object",
      inputComponent: conditionalFields,
      fields: [
        {
          type: "object",
          name: "input",
          fields: [
            {
              name: "condition",
              title: "Link Type",
              type: "string",
              options: {
                list: [
                  {
                    title: "Document (Internal)",
                    value: "documentInternal",
                  },
                  {
                    title: "URL (External)",
                    value: "linkExternal",
                  },
                ],
                layout: "radio",
              },
            },
          ],
        },
        {
          type: "object",
          name: "options",
          fields: [
            {
              title: "Document Reference",
              name: "documentInternal",
              type: "reference",
              to: [
                { type: "smartLink" },
                { type: "post" },
                // { type: "author" },
                // { type: "storeItem" },
              ],
            },
            {
              name: "linkExternal",
              title: "URL",
              type: "url",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};
