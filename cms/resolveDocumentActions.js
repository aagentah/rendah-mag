// resolveDocumentActions.js

// import the default document actions
import defaultResolve, {
  PublishAction,
  DeleteAction,
  UnpublishAction,
} from "part:@sanity/base/document-actions";

import { CustomPublish } from "./actions/CustomPublish";
import { CustomDelete } from "./actions/CustomDelete";
import { CustomUnpublish } from "./actions/CustomUnpublish";

export default function resolveDocumentActions(props) {
  return defaultResolve(props).map((Action) => {
    switch (Action) {
      case PublishAction:
        return CustomPublish;
        break;
      case DeleteAction:
        return CustomDelete;
        break;
      case UnpublishAction:
        return CustomUnpublish;
        break;
      default:
        return Action;
    }
  });
}
