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
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            {
              name: "caption",
              title: "Source / Caption",
              type: "blockContent",
            },
          ],
        },
      ],
    },
    {
      name: "description",
      title: "Item Description",
      type: "blockContent",
    },
    {
      name: "credits",
      title: "Credits",
      type: "blockContent",
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

    // Regional Pricing Configuration
    {
      name: "regionalPricing",
      title: "Regional Pricing",
      type: "object",
      description: "Set different prices for different regions",
      fields: [
        {
          name: "ukPrice",
          title: "UK Price (GBP)",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "usPrice",
          title: "US Price (USD)",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "canadaPrice",
          title: "Canada Price (CAD)",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "australiaPrice",
          title: "Australia Price (AUD)",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "chinaPrice",
          title: "China Price (CNY)",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "europePrice",
          title: "Europe Price (EUR)",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "globalPrice",
          title: "Global Price (GBP)",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
      ],
      validation: (Rule) => Rule.required(),
    },

    // Regional Shipping Configuration
    {
      name: "regionalShipping",
      title: "Regional Shipping",
      type: "object",
      description: "Set shipping costs for different regions",
      fields: [
        {
          name: "ukShipping",
          title: "UK Shipping",
          type: "object",
          fields: [
            {
              name: "price",
              title: "Price (GBP)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "usShipping",
          title: "US Shipping",
          type: "object",
          fields: [
            {
              name: "price",
              title: "Price (USD)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "canadaShipping",
          title: "Canada Shipping",
          type: "object",
          fields: [
            {
              name: "price",
              title: "Price (CAD)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "australiaShipping",
          title: "Australia Shipping",
          type: "object",
          fields: [
            {
              name: "price",
              title: "Price (AUD)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "chinaShipping",
          title: "China Shipping",
          type: "object",
          fields: [
            {
              name: "price",
              title: "Price (CNY)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "europeShipping",
          title: "Europe Shipping",
          type: "object",
          fields: [
            {
              name: "price",
              title: "Price (EUR)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "globalShipping",
          title: "Global Shipping",
          type: "object",
          fields: [
            {
              name: "price",
              title: "Standard Price (GBP)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },

    // Stripe Integration
    {
      name: "stripeProductId",
      title: "Stripe Product ID",
      type: "string",
      description:
        "Stripe product ID to attach prices to (e.g. prod_S5m1RcYOFCy7RB) - leave empty to create new products",
      placeholder: "prod_xxxxxxxxx",
    },

    // Legacy fields for backward compatibility (hidden from UI)
    {
      name: "price",
      title: "Legacy Price (GBP)",
      type: "number",
      description: "Legacy field - use Regional Pricing instead",
      hidden: true,
    },
    {
      name: "stripeCheckoutUrl",
      title: "Legacy Stripe Checkout URL",
      type: "string",
      description: "Legacy field - dynamic checkout is now used",
      hidden: true,
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
      ukPrice: "regionalPricing.ukPrice",
    },
    prepare(selection) {
      const { title, media, ukPrice } = selection;
      return {
        title: title,
        subtitle: ukPrice ? `£${ukPrice}` : "No UK price set",
        media: media,
      };
    },
  },
};
