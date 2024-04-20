class FetchError extends Error {
  info: string;
  status: number;
  constructor(message: string) {
    super(message);
    this.info = "";
    this.status = 0;
  }
}

const fetcher = async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
  const res = await fetch(...args);
  if (!res.ok) {
    const error = new FetchError("An error occurred while fetching data");

    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export { fetcher };

