import MDTextFields from "react-icons/lib/md/text-fields";

export default {
  name: "textBlock",
  type: "document",
  title: "Text Block",
  icon: MDTextFields,
  fields: [
    {
      name: "textColour",
      title: "Text Colour",
      type: "string",
      options: {
        list: [
          { title: "Black", value: "black" },
          { title: "White", value: "white" },
          { title: "Primary", value: "primary-color" },
          { title: "Secondary", value: "secondary-color" }
        ]
      },
      required: true
    },
    {
      name: "backgroundColour",
      title: "Background Colour",
      type: "string",
      options: {
        list: [
          { title: "Black", value: "black" },
          { title: "White", value: "white" },
          { title: "Primary", value: "primary-color" },
          { title: "Secondary", value: "secondary-color" }
        ]
      },
      required: true
    },
    {
      name: "textAlign",
      title: "Text Align",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" }
        ]
      },
      required: true
    },
    {
      name: "padding",
      title: "Padding",
      description: "Spacing inside the component. Number between 0-7",
      type: "number",
      required: true
    },
    {
      name: "margin",
      title: "Margin",
      description: "Spacing outside the component. Number between 0-7",
      type: "number",
      required: true
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      required: true
    }
  ],
  preview: {
    select: {
      textColour: "textColour",
      backgroundColour: "backgroundColour"
    },
    prepare(selection) {
      console.log("selection", selection);
      const { textColour, backgroundColour } = selection;
      return {
        title: "Text Block",
        subtitle: `colour-${textColour} / colour-${backgroundColour}`
      };
    }
  }
};
