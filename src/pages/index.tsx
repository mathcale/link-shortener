import { useState, MouseEvent } from 'react';
import ReactTooltip from 'react-tooltip';

import { Alert } from '../components';
import { UrlService } from '../services';

const IndexPage: React.FC = () => {
  const INITIAL_TOOLTIP_TEXT = 'Copy to clipboard';

  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [shorterUrl, setShorterUrl] = useState<string | null>(null);

  const [tooltipText, setTooltipText] = useState<string>(INITIAL_TOOLTIP_TEXT);
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

  const onShortenedLinkClick = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    await navigator.clipboard.writeText(shorterUrl);
    setTooltipText('Copied!');

    setTimeout(() => {
      setTooltipText(INITIAL_TOOLTIP_TEXT);
    }, 2000);
  };

  const renderSuccessAlertMessage = () => (
    <div>
      <p>
        Your new URL is{' '}
        <a href="#" onClick={onShortenedLinkClick} data-tip={tooltipText} className="font-bold">
          {shorterUrl}
        </a>
      </p>

      <ReactTooltip />
    </div>
  );

  return (
    <main className="mt-20">
      <h1 className="text-center text-4xl font-bold">Link shortener</h1>

      <div className="flex items-center w-full mt-10">
        <div className="w-full md:max-w-2xl md:mx-auto">
          {error && <Alert type="error" title="Error" message={error} />}

          {shorterUrl && (
            <Alert type="success" title="Success" CustomMessage={renderSuccessAlertMessage} />
          )}

          <form className="mb-4 md:flex md:flex-wrap md:justify-between">
            <div className="flex flex-col mb-4 md:w-3/4">
              <input
                type="text"
                name="url"
                placeholder="Type your URL here..."
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
                className="bg-white md:mr-5 p-4 shadow rounded-lg focus:outline-none focus:ring focus:border-blue-700"
              />
            </div>

            <div className="flex flex-col mb-4 md:w-1/4">
              <button
                type="button"
                onClick={(e) => (!isLoading ? onSubmitPress(e) : null)}
                disabled={isLoading}
                className="p-4 rounded-lg bg-blue-500 hover:bg-blue-700 text-white transition-colors"
              >
                Make it short!
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
