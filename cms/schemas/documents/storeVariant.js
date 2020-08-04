export default {
  title: "Product variant",
  name: "storeVariant",
  type: "object",
  fields: [
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "One Size", value: "1-Size" },
          { title: "X-Small", value: "XS" },
          { title: "Small", value: "S" },
          { title: "Medium", value: "M" },
          { title: "Large", value: "L" },
          { title: "X-Large", value: "XL" },
          { title: "XX-Large", value: "XXL" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "availability",
      title: "Availability",
      type: "string",
      options: {
        list: [
          { title: "Limited", value: "limited" },
          { title: "Unlimited", value: "unlimited" },
          { title: "Sold Out", value: "soldOut" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "quantity",
      title: "Item Quantity",
      description: "The initial batch stock of this item (If applicable)",
      type: "number",
    },
  ],
};
