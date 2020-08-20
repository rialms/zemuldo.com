import React from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Footer from '../../../../components/footer';
import Menu from '../../../../components/blog/menu';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import fetch from 'isomorphic-unfetch';
import { parseCookies } from 'nookies';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Entry from '../../../../components/entry';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../../../components/md/CodeBlock';
import Image from '../../../../components/md/Image';
import MarkdownLink from '../../../../components/md/Link';
import Heading from '../../../../components/md/Heading';

const api_url = process.env.API_URL;
const base_url = process.env.UI_URL;
const base_url_domain = process.env.UI_URL_DOMAIN;


const styles = () => ({
  devTo: {
    border: '3px solid #08a6f3',
    margin: 10,
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: 'green',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  twitterAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#08a6f3',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  fbAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#00f',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  linkedinAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#08a6f3',
    '&:hover': {
      cursor: 'pointer'
    }
  }
});


class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textValue: ''
    };
  }

  static async getInitialProps(ctx) {
    const { authorization } = parseCookies(ctx);
    const { draftId } = ctx.query;
    
    const res = await fetch(`${api_url}/post/draft/${draftId}`, { headers: { authorization } });
    const data = await res.json();
    let user;
    if (authorization) {
      const res = await fetch(`${api_url}/user`, { headers: { authorization } });
      user = await res.json();
    }
    return {
      user,
      authorization,
      draft: data,
      post: data,
      body: data
    };
  }
  linkedInShare = () => {
    const { draft } = this.props;
    const initial = 'https://www.linkedin.com/sharing/share-offsite?mini=true&url=';
    const shareURL = `${initial}https%3A%2F%2Fzemuldo.com/blog/post/${draft._id}&title=${draft.title.split(' ').join('+')}`;
    window.open(shareURL, 'sharer', 'toolbar=0,status=0,width=548,height=325');
  }
  fbShare = () => {
    const postUrl = `https%3A%2F%2Fzemuldo.com${window.location.pathname}`;
    let fbShareURL = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
    let shareURL = fbShareURL + '&amp;src=sdkpreparse\'';
    window.open(shareURL, 'sharer', 'toolbar=0,status=0,width=548,height=325');
  }
  tweetShare = () => {
    const { draft } = this.props;
    let hashTgs = '&hashtags=' + draft.tags.map(p => p.label).join(',');
    let via = '&via=zemuldo';
    let url = `&url=https%3A%2F%2F${base_url_domain}${window.location.pathname}`;
    let fullURL = `${url}${via}${hashTgs}`;
    let shareURL = `https://twitter.com/intent/tweet?text=${draft.title}` + fullURL;
    window.open(shareURL, 'sharer', 'toolbar=0,status=0,width=548,height=325');
  }
  render() {
    const { draft, classes, authorization } = this.props;
    return (
      <>
        <Head>
          <title>Zemuldo Blog - {draft.title}</title>
          <link href="/css/blog.css" rel="stylesheet" />
          <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@zemuldo" />
          <meta name="twitter:creator" content="@zemuldo" />
          <meta name="twitter:title" content={draft.title} />
          <meta name="twitter:description" content={draft.description} />
          <meta name="twitter:image" content={draft.coverPhotoUrl} />
          <meta property="og:title" content={draft.title} />
          <meta property="og:description" content={draft.description} />
          <meta property="og:image" content={draft.coverPhotoUrl} />
          <meta property="og:url" content={`${base_url}/blog/post/${draft._id}`} />
        </Head>
        <Container
          maxWidth="md"
          style={{
            color: 'white',
            fontFamily: '\'Courier New\', Courier, monospace',
            fontSize: '18px'
          }}
        >
          <Grid container justify="center" alignItems="center">
            <Menu authorization={authorization}>
              {
                this.props.authorization &&
                <Link href={`/blog/${draft._id}/edit`}>
                  <Avatar className={classes.greenAvatar}>
                    <EditIcon />
                  </Avatar>
                </Link>
              }
            </Menu>

          </Grid>
          <h1>{draft.title}</h1>

          <p>Posted {format(new Date(draft.createdAt), 'PPPP')}</p>
          <div className='blog-tags'>

            {
              draft.tags.map(tag =>
                <span className='blog-tags' style={{ color: tag.color, boxShadow: '0 8px 15px 0 rgba(95, 91, 95, .33)', backgroundColor: 'black', border: 'solid 2px transparent', borderRadius: '3px', cursor: 'pointer' }} key={tag.value}>
                  {tag.label}
                </span>)
            }
          </div>
          <Grid className='blog-share-buttons' container>
            <Avatar onClick={this.tweetShare} className={classes.twitterAvatar}>
              <i className="fa fa-twitter" />
            </Avatar>
            <Avatar onClick={this.fbShare} className={classes.fbAvatar}>
              <i className="fa fa-facebook" />
            </Avatar>
            <Avatar onClick={this.linkedInShare} className={classes.linkedinAvatar}>
              <i className="fa fa-linkedin" />
            </Avatar>
          </Grid>
        </Container>
        <Container>
          <img
            style={{ maxHeight: '720px', marginTop: '10px'}}
            src={draft.coverPhotoUrl}
            alt={draft.title}
          />
        </Container>

        <Container
          className='blog-body'
          maxWidth="md"
          style={{
            color: 'white',
            fontFamily: '\'Courier New\', Courier, monospace',
            fontSize: '18px'
          }}
        >
          <br />
          <ReactMarkdown
            source={draft.body}
            renderers={{ 
              code: CodeBlock, 
              image: Image, 
              link: MarkdownLink,
              heading: Heading
            }}
          />
        </Container>
        <Footer />
      </>
    );
  }
}

Blog.propTypes = {
  draft: PropTypes.object.isRequired,
  body: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  authorization: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
};

export default Entry(withStyles(styles)(Blog));