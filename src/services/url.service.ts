export const UrlService = {
  shorten: async (originalUrl: string): Promise<string | never> => {
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ url: originalUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? 'Unknown API error');
    }

    return data.shorterUrl;
  },
};
