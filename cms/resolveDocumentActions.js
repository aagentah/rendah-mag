// // resolveDocumentActions.js
//
// // import the default document actions
// import defaultResolve, {
//   PublishAction,
//   DeleteAction,
//   UnpublishAction,
// } from "part:@sanity/base/document-actions";
//
// import { CustomPublish } from "./actions/CustomPublish";
// import { CustomDelete } from "./actions/CustomDelete";
// import { CustomUnpublish } from "./actions/CustomUnpublish";
// import { PreviewLink } from "./actions/PreviewLink";
//
// export default function resolveDocumentActions(props) {
//   const actions = [];
//
//   defaultResolve(props).map((Action) => {
//     switch (Action) {
//       case PublishAction:
//         return actions.push(CustomPublish);
//         break;
//       case DeleteAction:
//         return actions.push(CustomDelete);
//         break;
//       case UnpublishAction:
//         return actions.push(CustomUnpublish);
//         break;
//       default:
//         return actions.push(Action);
//     }
//   });
//
//   actions.push(PreviewLink);
//
//   return actions;
// }
