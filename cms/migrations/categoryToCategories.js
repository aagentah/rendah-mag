import sanityClient from "part:@sanity/base/client";

const client = sanityClient.withConfig({ apiVersion: "2021-08-21" });

const BATCH_SIZE = 50;

async function migrate() {
  let start = 0;
  let hasMore = true;

  while (hasMore) {
    const posts = await client.fetch(
      `*[_type == "post"] | order(_createdAt asc) [${start}...${
        start + BATCH_SIZE - 1
      }]`
    );

    if (posts.length === 0) {
      console.log("No more posts to migrate");
      hasMore = false;
      continue;
    }

    const updatePromises = posts.map((post) => {
      if (post) {
        const divisions = [
          {
            _type: "reference",
            _ref: "9c455927-d41d-4932-b7d6-3c82453bdccb", // Replace with the actual division document ID
          },
        ];

        const updatedPost = {
          ...post,
          divisions,
        };

        return client
          .patch(post._id)
          .set(updatedPost)
          .commit({
            autoGenerateArrayKeys: true,
          })
          .then((updated) => {
            console.log(`Updated post ${updated._id}`);
          })
          .catch((err) => {
            console.error("Update failed: ", err.message);
          });
      } else {
        console.warn(
          `Skipped post ${post._id} due to undefined category or _ref`
        );
        return Promise.resolve();
      }
    });

    // Wait for all update operations to complete
    await Promise.all(updatePromises);

    start += BATCH_SIZE;
  }
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
