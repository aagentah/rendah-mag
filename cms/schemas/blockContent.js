import iconPaperclip from "react-icons/lib/fa/paperclip";
import iconImage from "react-icons/lib/fa/image";
import iconQuote from "react-icons/lib/fa/quote-left";
import iconSpotify from "react-icons/lib/fa/spotify";
import iconSoundcloud from "react-icons/lib/fa/soundcloud";
import iconYoutube from "react-icons/lib/fa/youtube";
import iconFacebook from "react-icons/lib/fa/facebook";
import iconButton from "react-icons/lib/md/touch-app";

export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  validation: Rule => Rule.required(),
  of: [
    {
      title: "Block",
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" }
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" }
        ],
        annotations: [
          {
            name: "inlineLink",
            title: "Inline Link",
            type: "object",
            icon: iconPaperclip,
            fields: [
              {
                name: "url",
                title: "URL",
                type: "string",
                validation: Rule => Rule.required()
              }
            ]
          }
        ]
      }
    },
    {
      type: "image",
      options: { hotspot: true },
      icon: iconImage,
      validation: Rule => Rule.required()
    },
    // {
    //   name: 'categories',
    //   title: 'Categories',
    //   type: 'reference',
    //   to: {type: 'category'}
    // },
    // {
    //   name: "subtitleBlock",
    //   title: "Subtitle",
    //   type: "object",
    //   fields: [
    //     {
    //       name: "subtitle",
    //       title: "Subtitle",
    //       type: "string",
    //       validation: Rule => Rule.required()
    //     }
    //   ]
    // },
    {
      name: "quoteBlock",
      title: "Quote",
      type: "object",
      icon: iconQuote,
      fields: [
        {
          name: "quote",
          title: "Quote",
          type: "text",
          description: "A quote by the subject that stands out",
          validation: Rule => Rule.required()
        },
        {
          name: "source",
          title: "Source",
          type: "string",
          description: "The source or subject",
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: "linkBlock",
      title: "Block Button Link",
      type: "object",
      icon: iconButton,
      fields: [
        {
          name: "text",
          title: "Text",
          type: "string",
          validation: Rule => Rule.required()
        },
        {
          name: "url",
          title: "URL",
          type: "string",
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: "spotifyEmbedBlock",
      title: "Spotify Embed",
      type: "object",
      icon: iconSpotify,
      fields: [
        {
          name: "spotifyEmbed",
          title: "Spotify Embed URI",
          description: "For example: spotify:track:5GZ4znceWfpTLrBBpr83DW",
          type: "string",
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: "soundCloudEmbedBlock",
      title: "SoundCloud Embed",
      type: "object",
      icon: iconSoundcloud,
      fields: [
        {
          name: "soundCloudEmbed",
          title: "SoundCloud Embed",
          type: "string",
          description: "For example: tracks/12345",
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: "youTubeEmbedBlock",
      title: "YouTube Embed",
      type: "object",
      icon: iconYoutube,
      fields: [
        {
          name: "youTubeEmbed",
          title: "YouTube Embed",
          type: "string",
          description: "For example: 2g811Eo7K8U",
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: "facebookVideoEmbedBlock",
      title: "Facebook Video Embed",
      type: "object",
      icon: iconFacebook,
      fields: [
        {
          name: "facebookVideoEmbed",
          title: "Facebook Video Embed",
          type: "string",
          description:
            "For example: https://www.facebook.com/Bloc2BlocEnt/videos/453723538461181/",
          validation: Rule => Rule.required()
        }
      ]
    }
  ]
};
