import iconPaperclip from "react-icons/lib/fa/paperclip";
import iconImage from "react-icons/lib/fa/image";
import iconQuote from "react-icons/lib/fa/quote-left";
import iconSpotify from "react-icons/lib/fa/spotify";
import iconSoundcloud from "react-icons/lib/fa/soundcloud";
import iconYoutube from "react-icons/lib/fa/youtube";
import iconFacebook from "react-icons/lib/fa/facebook";
import iconButton from "react-icons/lib/md/touch-app";
import iconAudioTrack from "react-icons/lib/md/audiotrack";

export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  validation: (Rule) => Rule.required(),
  of: [
    {
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
                validation: (Rule) => Rule.required(),
              },
            ],
          },
        ],
      },
    },
    {
      type: "image",
      icon: iconImage,
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
        {
          name: "caption",
          title: "Caption",
          type: "string",
        },
        {
          name: "source",
          title: "Source (URL)",
          type: "string",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
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
          validation: (Rule) => Rule.required(),
        },
        {
          name: "url",
          title: "URL",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "iframeEmbedBlock",
      title: "Iframe Embed",
      type: "object",
      fields: [
        {
          name: "iframeUrl",
          title: "Iframe URL",
          type: "string",
          description: "",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "iframeHeight",
          title: "Iframe Height (px)",
          type: "string",
          description: "",
          validation: (Rule) => Rule.required(),
        },
      ],
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
          validation: (Rule) => Rule.required(),
        },
      ],
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
          validation: (Rule) => Rule.required(),
        },
      ],
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
          validation: (Rule) => Rule.required(),
        },
      ],
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
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "audioEmbedBlock",
      title: "Audio Embed (via URL)",
      type: "object",
      icon: iconAudioTrack,
      fields: [
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
          name: "audioEmbed",
          title: "Facebook Video Embed",
          type: "string",
          description:
            "For example: https://res.cloudinary.com/dzz8ji5lj/video/upload/v1611694553/evidence.wav",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "allowDownload",
          title: "Allow Download",
          type: "boolean",
        },
      ],
    },
  ],
};
