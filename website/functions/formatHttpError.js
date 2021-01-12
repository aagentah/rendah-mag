export default async (response) => {
  try {
    return await JSON.stringify(await response.json());
  } catch (e) {
    if (response?.status || response?.statusText) {
      return `${response?.status} - ${response?.statusText}`;
    }

    return response;
  }
};
