import { useEffect } from 'react';

import type { GetServerSideProps } from 'next/types';

interface RedirectPageProps {
  url: string;
}

export default function RedirectPage({ url }: RedirectPageProps) {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await fetch(`${process.env.BASE_URL}/api/${params.id}`);

  if (!response.ok) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {},
    };
  }

  const { url } = await response.json();

  return {
    props: {
      url,
    },
  };
};
