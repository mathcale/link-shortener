import { MouseEvent, useState } from 'react';

import { Alert } from '../components';
import Head from 'next/head';
import Image from 'next/image';
import ReactTooltip from 'react-tooltip';
import { UrlService } from '../services';
import toggleOff from '../../public/toggle-off.png';
import toggleOn from '../../public/toggle-on.png';

const IndexPage: React.FC = () => {
  const INITIAL_TOOLTIP_TEXT = 'Copy to clipboard';

  const [isDark, setIsDark] = useState<boolean>(false);

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
      <p className="break-all">
        Your new URL is{' '}
        <a href="#" onClick={onShortenedLinkClick} data-tip={tooltipText} className="font-bold">
          {shorterUrl}
        </a>
      </p>

      <ReactTooltip />
    </div>
  );

  return (
    <>
      <Head>
        <title>MiniLinks - a simple link shortener by @mathcale</title>
      </Head>
      <main className={isDark ? 'dark' : ''}>
        <div className="bg-gray-200 pb-10 pt-32 px-10 md:px-0 flex flex-col justify-between h-screen dark:bg-gray-900">
          <div>
            <h1 className="text-center text-4xl font-bold mb-2 dark:text-gray-200">
              Link Shortener
            </h1>
            <p className="text-center text-gray-500">It shortens your links. That&apos;s it 🙃</p>

            <div className="flex items-center w-full mt-10">
              <div className="w-full md:max-w-2xl md:mx-auto">
                {error && <Alert type="error" title="Error" message={error} />}

                {shorterUrl && (
                  <Alert type="success" title="Success" CustomMessage={renderSuccessAlertMessage} />
                )}

                <form className="md:flex md:flex-wrap md:justify-between">
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
          </div>

          <div>
            {/* TOGGLE MODE */}
            <div className="flex justify-center text-sm items-center text-center text-gray-500 dark:text-gray-200">
              <span className={isDark ? 'font-thin' : 'text-blue-600 font-bold'}>Light</span>
              <button
                className="mx-2"
                onClick={() => (isDark ? setIsDark(false) : setIsDark(true))}
              >
                <Image src={isDark ? toggleOn : toggleOff} width={50} height={50} alt="toggle" />
              </button>
              <span className={isDark ? 'font-bold text-blue-600' : 'font-thin'}>Dark</span>
            </div>
            {/* END - TOGGLE MODE */}

            <p className="mb-5 text-gray-400 text-center text-xs">
              Created with{' '}
              <a href="https://nextjs.org/" target="_blank" rel="noreferrer" className="underline">
                Next.js
              </a>
              ,{' '}
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Tailwind
              </a>{' '}
              and{' '}
              <a href="https://upstash.com/" target="_blank" rel="noreferrer" className="underline">
                Upstash
              </a>{' '}
              by{' '}
              <a href="https://matheus.me" target="_blank" rel="noreferrer" className="underline">
                Matheus Calegaro
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default IndexPage;
