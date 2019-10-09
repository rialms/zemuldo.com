import React from 'react';
import Head from 'next/head';
import SocialSites from './social_sites';
import Terminal from './terminal_me';
import CustomLink from '../link';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>I&apos;m Danstan ~ Zemuldo</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@zemuldo" />
        <meta name="twitter:creator" content="@zemuldo" />
        <meta name="twitter:title" content="Danstan Onyango - Zemuldo Website" />
        <meta name="twitter:description" content="The personal website and blog for User @zemuldo. An enthusiastic Geek Freak of Code #Elixir #SQL #NodeJS #ReactJS" />
        <meta name="twitter:image" content="https://zemuldo.com/static/images/site/site_twitter_card.png" />
        <meta property='og:title' content="I'm Danstan Onyango ~ Zemuldo" />
        <meta property="og:image" content="https://zemuldo.com/static/images/site/site_twitter_card.png" />
        <meta property='og:description' content='The Website and Blog for user @zemuldo. Software Engineer with all the passion in the world!' />
        <meta property='og:url' content='https://zemuldo.com' />
      </Head>
      <div
        className="home-section-background"
        data-stellar-background-ratio="0.6"
      >
        <div className="display-table">
          <div className="display-table-cell">
            <div className="container">
              <div className="row">
                <div className="header-section">
                  <div className="header-frame">
                    <h1 className="color-6">Danstan Onyango</h1>
                    <h2>Software Engineer</h2>
                    <hr />
                    <h4 className="font-c-cn-m">
                      Currently being awesome at SafeBoda and formely at
                      HackerBay Inc.
                    </h4>
                    <h3 className="color-orange">Nairobi, Kenya</h3>
                    <h4 style={{ marginTop: '30px', fontSize: '1.8em' }} className="color-6 font-c-cn-m">
                      <CustomLink href='/journey'>
                        <b>See my journey 🚀🚀</b>
                      </CustomLink>
                    </h4>
                  </div>
                  <div
                    id="me-pic-wrapper"
                    className="img-frame border-color-green"
                  >
                    <img
                      id="me-pic"
                      src="/static/images/logo/black.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-12 text-center">
                  <Terminal />
                </div>
              </div>
            </div>
            <SocialSites />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
