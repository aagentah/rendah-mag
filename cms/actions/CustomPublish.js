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

  const compressImage = () => {
    const loopPropsForImages = async (objectProps, isBody) => {
      for (const prop in objectProps) {
        const item = objectProps[prop];

        if (item?.type === "image" || item?._type === "image") {
          // Check if resize has been selected
          const resizeVal = item?.resize;
          if (!resizeVal || resizeVal === "none") continue;

          // Fetch imageURL
          const imageUrl = await imageBuilder.image(item).url();

          const getImageWidth = (src) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(img.width);
              img.onerror = reject;
              img.src = src;
            });
          };

          const imageWidth = await getImageWidth(imageUrl);
          console.log("imageWidth", imageWidth);
          if (imageWidth <= parseInt(resizeVal, 10)) continue;

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
              maxWidth: parseInt(resizeVal, 10),
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
              filename: `compressed-${prop}-${parseInt(resizeVal, 10)}.png`,
            })
            .then((document) => {
              return document;
            })
            .catch((error) => {
              console.error("Upload failed:", error.message);
            });

          const newItem = JSON.parse(JSON.stringify(item));
          newItem.asset._ref = uploadedDocument._id;

          if (isBody) {
            // Patch current document's image with uploaded image
            await client
              .patch(id)
              .setIfMissing({ body: [] })
              .insert("replace", `body[${prop}]`, [newItem])
              .commit()
              .then((res) => {
                return res;
              })
              .catch((err) => {
                console.error("Oh no, the update failed: ", err.message);
                return false;
              });
          } else {
            // Patch current document's image with uploaded image
            await client
              .patch(id)
              .set({ [prop]: newItem })
              .commit()
              .then((res) => {
                return res;
              })
              .catch((err) => {
                console.error("Oh no, the update failed: ", err.message);
                return false;
              });
          }

          // Delete previous image from Sanity
          await client.delete(item.asset._ref).then((result) => {
            console.log("Deleted image", result);
          });
        }
      }
    };

    loopPropsForImages(draft, false);
    if (draft?.body) loopPropsForImages(draft.body, true);
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    setDialogOpen(false);

    if (inputVal === adminPublishPassword && draft) {
      setIsActioning(true);
      publish.execute();
      compressImage();
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
