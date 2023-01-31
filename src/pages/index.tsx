import { useState, MouseEvent } from 'react';
import Head from 'next/head';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Trans, useTranslation } from 'react-i18next';

import { Alert } from '../components';
import { UrlService } from '../services';

const IndexPage: React.FC = () => {
  const { t } = useTranslation();

  const INITIAL_TOOLTIP_TEXT = t('index.tooltips.copy');

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
      setError(t('index.alerts.error.messages.invalidUrl'));
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
    setTooltipText(t('index.tooltips.copied'));

    setTimeout(() => {
      setTooltipText(INITIAL_TOOLTIP_TEXT);
    }, 2000);
  };

  const renderSuccessAlertMessage = () => (
    <div>
      <p className="break-all">
        <Trans
          i18nKey="index.alerts.success.message"
          values={{
            shorterUrl,
          }}
          components={{
            url: (
              <a
                href="#"
                onClick={onShortenedLinkClick}
                data-tip={tooltipText}
                className="font-bold"
              />
            ),
          }}
          tOptions={{ interpolation: { escapeValue: false } }}
        />
      </p>

      <ReactTooltip />
    </div>
  );

  return (
    <>
      <Head>
        <title>{t('index.head.title')}</title>
      </Head>

      <main className="pt-20 px-10 md:px-0 flex flex-col justify-between h-screen">
        <div>
          <h1 className="text-center text-4xl font-bold mb-2 dark:text-white">
            {t('index.title')}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">{t('index.subtitle')}</p>

          <div className="flex items-center w-full mt-10">
            <div className="w-full md:max-w-2xl md:mx-auto">
              {error && (
                <Alert type="error" title={t('index.alerts.error.title')} message={error} />
              )}

              {shorterUrl && (
                <Alert
                  type="success"
                  title={t('index.alerts.success.title')}
                  CustomMessage={renderSuccessAlertMessage}
                />
              )}

              <form className="md:flex md:flex-wrap md:justify-between">
                <div className="flex flex-col mb-4 md:w-3/4">
                  <input
                    type="text"
                    name="url"
                    placeholder={t('index.inputs.url.placeholder')}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isLoading}
                    className="bg-white md:mr-5 p-4 shadow rounded-lg focus:outline-none focus:ring focus:ring-opacity-20 focus:ring-blue-700 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-200"
                  />
                </div>

                <div className="flex flex-col mb-4 md:w-1/4">
                  <button
                    type="button"
                    onClick={(e) => (!isLoading ? onSubmitPress(e) : null)}
                    disabled={isLoading}
                    className="p-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors dark:bg-blue-800 dark:hover:bg-blue-600"
                  >
                    {t('index.actionButton')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <p className="mb-5 text-gray-600 text-center text-xs dark:text-gray-400">
          <Trans
            i18nKey="index.footer"
            components={{
              nextJsLink: (
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                />
              ),
              tailwindLink: (
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                />
              ),
              upstashLink: (
                <a
                  href="https://upstash.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                />
              ),
              matheusLink: (
                <a
                  href="https://matheus.me"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                />
              ),
            }}
          />
        </p>
      </main>
    </>
  );
};

export default IndexPage;
