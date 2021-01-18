export default async (response) => {
  try {
    return JSON.stringify(await response.json());
  } catch (e) {
    if (response?.status || response?.statusText) {
      return `${response?.status} - ${response?.statusText}`;
    }

    return response;
  }
};
