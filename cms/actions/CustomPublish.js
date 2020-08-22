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

  const properties = published || draft;

  for (var prop in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, prop)) {
      // do stuff
      if (properties[prop]._type === "image") {
        const imageProp = properties[prop];

        const { patch, publish } = useDocumentOperation(
          imageProp.asset._ref,
          "sanity.imageAsset"
        );

        const imagePropURL = imageBuilder.image(imageProp).url();

        fetch(imagePropURL)
          .then(function (response) {
            return response.blob();
          })
          .then(function (blob) {
            console.log("blob", blob);

            new Compressor(blob, {
              // quality: 0.9,
              maxWidth: 1080,
              success(result) {
                //

                fetch("https://rm-staging-2020.herokuapp.com/api/cors", {
                  method: "post",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    blob: result,
                  }),
                }).then((response) => {
                  console.log("response", response);
                  //do something awesome that makes the world a better place
                });
              },
              error(err) {
                console.log(err.message);
              },
            });
          });

        // patch.execute([{ set: { _ref: "" } }]);
      }
    }
  }

  const handleButtonClick = (e) => {
    const { patch, publish } = useDocumentOperation(id, type);
    e.preventDefault();
    setDialogOpen(false);

    if (inputVal === adminPublishPassword) {
      setIsActioning(true);
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
