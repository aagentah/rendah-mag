// PreviewLink.js
import React, { useState } from "react";
// import MDWeb from "react-icons/lib/md/web";
import resolveProductionUrl from "../resolveProductionUrl";

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

export function PreviewLink(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  let previewLink;

  if (props?.type === "post" || props?.type === "creations") {
    if (props?.draft) {
      previewLink = resolveProductionUrl(props.draft);
    } else if (props?.published) {
      previewLink = resolveProductionUrl(props.published);
    }

    return {
      label: "Preview link",
      icon: null,
      onHandle: () => {
        setDialogOpen(true);
        copyToClipboard(previewLink);

        setTimeout(() => {
          setDialogOpen(false);
        }, 3500);
      },
      dialog: dialogOpen && {
        type: "popover",
        onClose: props.onComplete,
        content: `✅ Copied to clipboard: ${previewLink}`,
      },
    };
  }

  return false;
}
