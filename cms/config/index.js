import sanityClient from "@sanity/client";

const options = {
  // Find your project ID and dataset in `sanity.json` in your studio project
  dataset: "production",
  projectId: "q8z2vf2k",
  useCdn: false,
  token:
    "skNPRiajLlqPMTTX9DGJUpsufAAvRYblPRJCsXx3NREjy6cQ3TfPbpUDj47gtVxZPlIe106Eaq0w9ruvz7MeR9rtIrZ69mhZIvowBdvCkVHvqcXrcrlY5vHbU400H4yD71dLhzpsRQM0dK0mG6B4uKadlAsnKYodVNXnwOBQ9VFXivpJntQ4",
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
};

export default sanityClient(options);
export const previewClient = sanityClient({
  ...options,
});
