import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          defineField({
            name: "inlineLink",
            title: "Inline Link",
            type: "object",
            fields: [
              {
                name: "url",
                title: "URL",
                type: "string",
                validation: (Rule) => Rule.required(),
              },
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      name: "subtitleBlock",
      title: "Sub Title",
      type: "object",
      fields: [
        {
          name: "subtitle",
          title: "Sub Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineArrayMember({
      type: "image",
      fields: [
        {
          name: "fullImage",
          title: "Full Image",
          type: "boolean",
        },
        {
          name: "caption",
          title: "Source / Caption",
          type: "blockContent",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineArrayMember({
      name: "carousel",
      title: "Carousel",
      type: "object",
      fields: [
        {
          title: "Images",
          name: "images",
          type: "array",
          of: [
            defineArrayMember({
              type: "image",
              fields: [
                {
                  name: "caption",
                  title: "Source / Caption",
                  type: "blockContent",
                },
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
        {
          name: "carouselHeightDesktop",
          title: "Carousel Height (Desktop)",
          type: "number",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "carouselHeightMobile",
          title: "Carousel Height (Mobile)",
          type: "number",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "slidesPerViewDesktop",
          title: "Number of Slides per View (Desktop)",
          type: "number",
          validation: (Rule) => Rule.min(1).required(),
        },
      ],
    }),
    defineArrayMember({
      name: "quoteBlock",
      title: "Quote",
      type: "object",
      fields: [
        {
          name: "quote",
          title: "Quote",
          type: "text",
          description: "A quote by the subject that stands out",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "source",
          title: "Source",
          type: "string",
          description: "The source or subject",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineArrayMember({
      name: "linkBlock",
      title: "Block Button Link",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "url",
          title: "URL",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineArrayMember({
      name: "iframeEmbedBlock",
      title: "Iframe Embed",
      type: "object",
      fields: [
        {
          name: "iframeUrl",
          title: "Iframe URL",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "iframeHeightDesktop",
          title: "Iframe Height (Desktop) [px]",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "iframeHeightMobile",
          title: "Iframe Height (Mobile) [px]",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineArrayMember({
      name: "spotifyEmbedBlock",
      title: "Spotify Embed",
      type: "object",
      fields: [
        {
          name: "spotifyEmbed",
          title: "Spotify Embed URI",
          description: "For example: spotify:track:5GZ4znceWfpTLrBBpr83DW",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineArrayMember({
      name: "soundCloudEmbedBlock",
      title: "SoundCloud Embed",
      type: "object",
      fields: [
        {
          name: "soundCloudEmbed",
          title: "SoundCloud Embed",
          type: "string",
          description: "For example: tracks/12345",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineArrayMember({
      name: "youTubeEmbedBlock",
      title: "YouTube Embed",
      type: "object",
      fields: [
        {
          name: "youTubeEmbed",
          title: "YouTube Embed",
          type: "string",
          description: "For example: 2g811Eo7K8U",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineArrayMember({
      name: "facebookVideoEmbedBlock",
      title: "Facebook Video Embed",
      type: "object",
      fields: [
        {
          name: "facebookVideoEmbed",
          title: "Facebook Video Embed",
          type: "string",
          description:
            "For example: https://www.facebook.com/Bloc2BlocEnt/videos/453723538461181/",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    // defineArrayMember({
    //   name: "audioEmbedBlock",
    //   title: "Audio Embed (via URL)",
    //   type: "object",
    //   fields: [
    //     {
    //       name: "title",
    //       title: "Title",
    //       type: "string",
    //       validation: (Rule) => Rule.required(),
    //     },
    //     {
    //       name: "description",
    //       title: "Description",
    //       type: "array",
    //       of: [{ type: "block" }],
    //     },
    //     {
    //       name: "audioEmbed",
    //       title: "Audio Embed",
    //       type: "string",
    //       description:
    //         "For example: https://res.cloudinary.com/dzz8ji5lj/video/upload/v1611694553/evidence.wav",
    //       validation: (Rule) => Rule.required(),
    //     },
    //     {
    //       name: "allowDownload",
    //       title: "Allow Download",
    //       type: "boolean",
    //     },
    //   ],
    // }),
    defineArrayMember({
      name: "codeBlock",
      title: "Code Block",
      type: "object",
      fields: [
        {
          name: "language",
          title: "Language",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "code",
          title: "Code",
          type: "text",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineArrayMember({
      name: "audioFileBlock",
      title: "Audio File",
      type: "object",
      fields: [
        {
          name: "image",
          title: "Image",
          type: "image",
        },
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "description",
          title: "Description",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "audioFile",
          title: "Audio File",
          type: "file",
          options: {
            accept: "audio/*",
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
});
