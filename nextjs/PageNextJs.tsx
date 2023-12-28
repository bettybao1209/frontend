/* eslint-disable max-len */
import Head from 'next/head';
import React from 'react';

import type { Route } from 'nextjs-routes';

import useAdblockDetect from 'lib/hooks/useAdblockDetect';
import useGetCsrfToken from 'lib/hooks/useGetCsrfToken';
// import * as metadata from 'lib/metadata';
import * as mixpanel from 'lib/mixpanel';
import { init as initSentry } from 'lib/sentry/config';

type Props = Route & {
  children: React.ReactNode;
}

initSentry();

const title = 'NeoX Blockchain Explorer';
const description = 'NeoX blockchain explorer allows you to explore and search the Neox blockchain for transactions, addresses, tokens, prices and other activities taking place on NeoX';
const opengraph = {
  title: 'NeoX Blockchain Explorer',
  description: 'NeoX blockchain explorer allows you to explore and search the Neox blockchain for transactions, addresses, tokens, prices and other activities taking place on NeoX',
  imageUrl: 'https://neo-web.azureedge.net/images/twitter-img.jpg',
  url: 'https://xt1scan.ngd.network/',
};

const PageNextJs = (props: Props) => {
  // const { title, description, opengraph } = metadata.generate(props);

  useGetCsrfToken();
  useAdblockDetect();

  const isMixpanelInited = mixpanel.useInit();
  mixpanel.useLogPageView(isMixpanelInited);

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ description }/>

        { /* OG TAGS */ }
        <meta property="og:title" content={ opengraph.title }/>
        { opengraph.description && <meta property="og:description" content={ opengraph.description }/> }
        <meta property="og:image" content={ opengraph.imageUrl }/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={ opengraph.url }/>
        <meta property="og:site_name" content={ opengraph.title }/>
        <meta property="og:image:alt" content="Visit NeoX Blockchain Explorer"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={ opengraph.title }/>
        <meta property="twitter:description" content={ opengraph.description }/>
        <meta name="twitter:site" content="@neo_blockchain"/>
        <meta property="twitter:image" content={ opengraph.imageUrl }/>
      </Head>
      { props.children }
    </>
  );
};

export default React.memo(PageNextJs);
