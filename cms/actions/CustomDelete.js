import React, { useState, useEffect } from "react";
import { useDocumentOperation } from "@sanity/react-hooks";

export function CustomDelete({ id, type, published, draft, onComplete }) {
  const { delete: del } = useDocumentOperation(id, type);
  const [isActioning, setIsActioning] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const adminPublishPassword = "password";

  const handleButtonClick = () => {
    setDialogOpen(false);

    if (inputVal === adminPublishPassword) {
      setIsActioning(true);
      del.execute();
      onComplete();
    }
  };

  return {
    label: isActioning ? "Deleting…" : "Delete",
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
