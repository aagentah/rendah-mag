// import Link from 'next/link';

// import Heading from '~/components/elements/heading';
// import Button from '~/components/elements/button';
// import CardDashboard from '~/components/card/dashboard';

// import { useUser } from '~/lib/hooks';

// export default function ProfileCreations({ handleToggle }) {
//   const [user, { loading, mutate, error }] = useUser();

//   if (user?.isDominion) {
//     return (
//       <section>
//         <div className="ph3">
//           <div className="profile_heading">
//             <Heading
//               /* Options */
//               htmlEntity="h1"
//               text="Member Dashboard"
//               color="white"
//               size="medium"
//               truncate={null}
//               /* Children */
//               withLinkProps={null}
//             />
//           </div>

//           <div className="pb4  mb2">
//             <p className="white  f6  lh-copy  measure-wide">
//               Welcome to the Membership! Here you can access all exclusive content
//               available on your subscription. We add new content here frequently
//               month-to-month, make sure to keep an eye here for cool stuff.
//             </p>
//           </div>
//         </div>

//         <div className="flex  flex-wrap  pb3">
//           <div className="col-24  col-6-md  pb3  pb0-md">
//             <div className="ph3 pv2">
//               <CardDashboard
//                 title="Messages"
//                 id="messages"
//                 coverImage="/images/packs.jpg"
//                 i={2}
//                 handleToggle={handleToggle}
//               />
//             </div>
//           </div>
//           <div className="col-24  col-6-md  pb3  pb0-md">
//             <div className="ph3 pv2">
//               <CardDashboard
//                 title="Dubplates"
//                 id="offerings"
//                 coverImage="/images/dubs.jpg"
//                 i={1}
//                 handleToggle={handleToggle}
//               />
//             </div>
//           </div>
//           <div className="col-24  col-6-md  pb3  pb0-md">
//             <div className="ph3 pv2">
//               <CardDashboard
//                 title="Articles"
//                 id="creations"
//                 coverImage="/images/creations.jpg"
//                 i={3}
//                 handleToggle={handleToggle}
//               />
//             </div>
//           </div>
//           <div className="col-24  col-6-md  pb3  pb0-md">
//             <div className="ph3 pv2">
//               <CardDashboard
//                 title="Prints"
//                 id="prints"
//                 coverImage="/images/prints.jpg"
//                 i={4}
//                 handleToggle={handleToggle}
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!user?.isDominion) {
//     return (
//       <>
//         <div className="pb3">
//           <Heading
//             /* Options */
//             htmlEntity="h1"
//             text="You are not currently in the Dominion"
//             color="white"
//             size="medium"
//             truncate={null}
//             /* Children */
//             withLinkProps={null}
//           />
//         </div>
//         <div className="pb3">
//           <Button
//             /* Options */
//             type="primary"
//             size="medium"
//             text="Click here to join"
//             color="white"
//             fluid={false}
//             icon={null}
//             iconFloat={null}
//             inverted={true}
//             loading={false}
//             disabled={false}
//             skeleton={false}
//             onClick={null}
//             /* Children */
//             withLinkProps={{
//               type: 'next',
//               href: '/membership',
//               target: null,
//               routerLink: Link,
//               routerLinkProps: {
//                 scroll: false,
//               },
//             }}
//           />
//         </div>
//       </>
//     );
//   }

//   return (
//     <Heading
//       /* Options */
//       htmlEntity="h1"
//       text="No results."
//       color="white"
//       size="medium"
//       truncate={null}
//       /* Children */
//       withLinkProps={null}
//     />
//   );
// }
