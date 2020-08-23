import React, { useState, useEffect } from "react";
import { useDocumentOperation } from "@sanity/react-hooks";
import Compressor from "compressorjs";
import client from "../config";
import { imageBuilder } from "../requests";

export function CustomPublish({ id, type, published, draft, onComplete }) {
  const [isActioning, setIsActioning] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const adminPublishPassword = "password";
  const { patch, publish } = useDocumentOperation(id, type);

  const compressImage = async () => {
    const properties = draft || published;

    for (const prop in properties) {
      const item = properties[prop];

      if (item?.type === "image" || item?._type === "image") {
        const imageUrl = await imageBuilder.image(item).url();

        // Fetch uploaded image's blob
        const fetchBlob = await fetch(imageUrl)
          .then((response) => {
            return response.blob();
          })
          .then((blob) => {
            return blob;
          });

        // Compress blob
        const compressedBlob = await new Promise((resolve, reject) => {
          new Compressor(fetchBlob, {
            maxWidth: 10,
            success(result) {
              resolve(result);
            },
            error(err) {
              console.log(err.message);
            },
          });
        });

        // Upload compressed image to Sanity
        const uploadedDocument = await client.assets
          .upload("image", compressedBlob, {
            contentType: "image/png",
            filename: `compressed-${properties._id}-
              ${Math.floor(Math.random() * 500)}.png`,
          })
          .then((document) => {
            return document;
          })
          .catch((error) => {
            console.error("Upload failed:", error.message);
          });

        // Patch current document's image with uploaded image
        await patch.execute([
          {
            set: {
              [prop]: {
                type: "image",
                asset: {
                  _type: "reference",
                  _ref: uploadedDocument._id,
                },
              },
            },
          },
        ]);

        console.log("done");

        // Delete previous image from Sanity
        // await client.delete(item.asset._ref).then((result) => {
        //   console.log("deleted imageAsset", result);
        // });
      }
    }
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    setDialogOpen(false);

    if (inputVal === adminPublishPassword) {
      setIsActioning(true);
      await compressImage();
      publish.execute();
      onComplete();
    }
  };

  return {
    label: isActioning ? "Publishing…" : "Publish",
    onHandle: () => {
      setDialogOpen(true);
    },
    dialog: isDialogOpen && {
      type: "modal",
      onClose: () => {
        setDialogOpen(false);
      },
      content: (
        <>
          <h2>Enter admin password</h2>
          <form onSubmit={handleButtonClick}>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit">Done</button>
          </form>
        </>
      ),
    },
  };
}
