export default {
  name: "membership",
  title: "Membership",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Membership Title",
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
      name: "isActive",
      title: "Active Membership",
      type: "boolean",
      description: "Set to true for the currently active membership plan",
      validation: (Rule) => Rule.required(),
    },

    // Regional Pricing Configuration for Subscriptions
    {
      name: "regionalPricing",
      title: "Regional Pricing (Monthly)",
      type: "object",
      description:
        "Set different monthly subscription prices for different regions - Stripe prices will be created dynamically",
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

    // Legacy fields for backward compatibility (hidden from UI)
    {
      name: "legacyStripeUrl",
      title: "Legacy Stripe URL",
      type: "string",
      description: "Legacy field - dynamic checkout is now used",
      hidden: true,
    },
  ],

  orderings: [
    {
      title: "Active First",
      name: "activeFirst",
      by: [
        { field: "isActive", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      ukPrice: "regionalPricing.ukPrice",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, ukPrice, isActive } = selection;
      return {
        title: title,
        subtitle: `${isActive ? "🟢 Active" : "⚪ Inactive"} - ${ukPrice ? `£${ukPrice}/month` : "No UK price set"}`,
      };
    },
  },
};
