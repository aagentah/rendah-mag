export default async (response) => {
  try {
    return await JSON.stringify(await response.json());
  } catch (e) {
    return `${response?.status} - ${response?.statusText}`;
  }
};
