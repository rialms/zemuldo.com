import React from 'react';
import Home from '../components/home/index';
import Footer from '../components/footer';
import Entry from '../components/entry';
import Head from 'next/head';

function Index() {
  return (
    <React.Fragment>
      <Head>
      <Head>
        <title>I&apos;m Zemuldo ~ Danstan Onyango, Software Engineer</title>
        <meta name="description" content="Danstan Onyango ~ Zemuldo, Software Engineer - Nairobi, Kenya, Self Taught. Elixir, Node, React, PostgreSQL. Writer @Medium, @Dev.  🚀🚀Geek🚀🚀 " />
      </Head>
      </Head>
      <Home />
      <Footer />
    </React.Fragment>
  );
}

export default Entry(Index);