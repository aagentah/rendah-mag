// import conditionalFields from "../../components/helpers/conDitionalFields";

export default {
  name: "blockContentCarousel",
  type: "document",
  icon: null,
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
    },
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
    {
      name: "caption",
      title: "Source / Caption",
      type: "blockContent",
    },
  ],
  validation: (Rule) => Rule.required(),
  preview: {
    select: {
      media: "image",
    },
  },
};
