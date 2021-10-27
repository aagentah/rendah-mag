// import conditionalFields from "../../components/helpers/conDitionalFields";

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
      name: "condition",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          {
            title: "URL (External)",
            value: "linkExternal",
          },
          {
            title: "Document (Internal)",
            value: "documentInternal",
          },
        ],
        layout: "radio",
      },
    },
    {
      name: "linkExternal",
      title: "URL",
      type: "url",
      hidden: ({ document, parent, value }) =>
        parent?.condition === "documentInternal",
    },
    {
      title: "Document Reference",
      name: "documentInternal",
      type: "reference",
      to: [{ type: "smartLink" }, { type: "post" }],
      hidden: ({ document, parent, value }) =>
        parent?.condition !== "documentInternal",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
