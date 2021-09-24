import { useState, MouseEvent } from 'react';

import { UrlService } from '../services';

const IndexPage: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [shorterUrl, setShorterUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitPress = async (e: MouseEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();

    setError(null);
    setShorterUrl(null);

    // FIXME: move validation to its own service
    const exp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

    if (url === '' || !exp.test(url)) {
      setError('Invalid URL!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await UrlService.shorten(url);
      setShorterUrl(response);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Link shortener</h1>

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {shorterUrl && (
        <div className="success">
          <p>
            Your new URL is <strong>{shorterUrl}</strong>
          </p>
        </div>
      )}

      <form name="urlShortener">
        <label htmlFor="url">URL</label>
        <input
          type="text"
          name="url"
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
        />

        <button
          type="button"
          onClick={(e) => (!isLoading ? onSubmitPress(e) : null)}
          disabled={isLoading}
        >
          Make it short!
        </button>
      </form>
    </div>
  );
};

export default IndexPage;
