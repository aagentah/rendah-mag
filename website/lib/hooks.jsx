import useSWR from "swr";

// export const fetcher = url => fetch(url).then(r => r.json());

const fetcher = url =>
  fetch(url)
    .then(r => r.json())
    .then(data => {
      return { user: data?.user || null };
    });

export function useUser() {
  const { data, error, mutate } = useSWR("/api/user", fetcher);
  // if data is not defined, the query has not completed
  const loading = !data;
  const user = data?.user;
  return [user, { mutate, loading, error }];
}
