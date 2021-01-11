import useSWR from 'swr';

// export const fetcher = url => fetch(url).then(r => r.json());

export function useUser() {
  const fetcher = (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        return { user: data?.user || null };
      });

  const { data, error, mutate } = useSWR('/api/user', fetcher);
  // if data is not defined, the query has not completed
  const loading = !data;
  const user = data?.user;
  return [user, { mutate, loading, error }];
}

export function useJsonData(url) {
  const fetcher = (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        return { data: data || null };
      });

  const { data, error } = useSWR(url, fetcher);
  // if data is not defined, the query has not completed
  const loading = !data;
  return [data, { loading, error }];
}
