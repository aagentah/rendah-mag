export default {
  name: "storeItem",
  title: "Item",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Item Title",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "storeCategory" },
    },
    {
      name: "collection",
      title: "Collection",
      type: "reference",
      to: { type: "storeCollection" },
    },
    {
      name: "publishedAt",
      title: "Publish Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image1",
      title: "Image 1",
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
              { title: "1920px", value: "1920" },
            ],
            layout: "radio",
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image2",
      title: "Image 2",
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
              { title: "1920px", value: "1920" },
            ],
            layout: "radio",
          },
        },
      ],
    },
    {
      name: "description",
      title: "Item Description",
      type: "blockContent",
    },
    {
      title: "Variants",
      name: "variants",
      type: "array",
      of: [
        {
          title: "Variant",
          type: "storeVariant",
        },
      ],
    },
    {
      name: "credits",
      title: "Credits",
      type: "blockContent",
    },
    {
      name: "weight",
      title: "Item Weight (g)",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Item Price (GBP)",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "specialPrice",
      title: "Special Price (GBP)",
      description: "Will be used as the new price.",
      type: "number",
    },
    {
      name: "tag",
      title: "Tag",
      type: "string",
      options: {
        list: [
          { title: "None", value: "None" },
          { title: "Sale", value: "Sale" },
          { title: "Pre-order", value: "Pre-order" },
          { title: "Sold-out", value: "Sold-out" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "priceId",
      title: "Price ID",
      description: "Fetched from Stripe",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shippingUK",
      title: "Shipping UK",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shippingEurope",
      title: "Shipping Europe",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shippingWorldwide",
      title: "Shipping Worldwide",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
  ],

  orderings: [
    {
      title: "Publish Date",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "image1",
    },
  },
};
