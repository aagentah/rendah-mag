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
      if (
        typeof properties[prop] === "object" &&
        properties[prop] !== null &&
        properties[prop]?.type === "image"
      ) {
        const imageProp = properties[prop];
        const imagePropURL = await imageBuilder.image(imageProp).url();

        const fetchBlob = await fetch(imagePropURL)
          .then((response) => {
            return response.blob();
          })
          .then((blob) => {
            return blob;
          });

        new Compressor(fetchBlob, {
          // quality: 0.9,
          maxWidth: 10,
          success(result) {
            client.assets
              .upload("image", result, {
                contentType: "image/png",
                filename: `img-${properties._id}.png`,
              })
              .then((document) => {
                patch.execute([
                  {
                    set: {
                      [prop]: {
                        type: "image",
                        asset: {
                          _type: "reference",
                          _ref: document._id,
                        },
                      },
                    },
                  },
                ]);
              })
              .catch((error) => {
                console.error("Upload failed:", error.message);
              });
          },
          error(err) {
            console.log(err.message);
          },
        });
      }
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    setDialogOpen(false);

    if (inputVal === adminPublishPassword) {
      setIsActioning(true);
      // compressImage();
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
