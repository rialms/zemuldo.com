import React from 'react';
import Container from '@material-ui/core/Container';
import fetch from 'isomorphic-unfetch';
import Footer from '../components/footer';
import Blogs from '../components/blog/blogs';
import Menu from '../components/blog/menu';
import LinearProgress from '@material-ui/core/LinearProgress';
import { parseCookies } from 'nookies';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Entry from '../components/entry';
import FeaturedPost from '../components/blog/featured';
import ShouldRender from '../components/tools/shouldRender';
import NoContent from '../components/NoContent';
import TopTags from '../components/blog/TopTags';

const api_url = process.env.API_URL;
const ex_api_url = process.env.EX_API_URL;

class Blog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts,
      lastLength: 10,
      limit: 10,
      currentTag: this.props.currentTag,
    };
  }

  static initialPosts(tag) {
    if (!tag) return fetch(`${api_url}/post?skip=0&limit=10`);
    else return fetch(`${api_url}/post?&tag=${tag}`);
  }

  static async getInitialProps(ctx) {
    const {tag} = ctx.query;
    const topTagsRes = await fetch(`${ex_api_url}/api/top_tags`);
    const topTags = topTagsRes.status === 200 ? await topTagsRes.json() : [];
    const { authorization } = parseCookies(ctx);
    const res = await this.initialPosts(tag);
    const data = await res.json();
    const res_featured = await fetch(`${api_url}/post/latest`);
    const data_featured = await res_featured.json();
    let user;
    if (authorization) {
      const res = await fetch(`${api_url}/user`, { headers: { authorization } });
      user = await res.json();
    }
    return {
      featuredPost: res_featured.status === 200? data_featured: null,
      user,
      authorization,
      posts: data,
      topTags,
      currentTag: tag
    };
  }

  infiniteScroll = async (inView, _) => {
    const { lastLength, limit } = this.state;
    if (inView && lastLength !== 0) {
      this.setState({ fetching: true });
      const res = await fetch(`${api_url}/post?skip=${this.state.posts.length}&limit=${limit}`);
      const data = await res.json();
      this.setState({ posts: this.state.posts.concat(data), lastLength: data.length });
      this.setState({ fetching: false });
    }

  }

  fetchPosts = async () =>{
    this.props.router.push('/blog', '/blog', { shallow: true });
    const res = await fetch(`${api_url}/post`);
    const posts = await res.json();
    this.setState({posts, currentTag: null});
  }

  filterByTag = async (tag) =>{
    if (!tag) return this.fetchPosts();
    this.props.router.push('/blog', `/blog?tag=${tag}`,  { shallow: true });
    const res = await fetch(`${api_url}/post?&tag=${tag}`);
    const posts = await res.json();
    this.setState({currentTag: tag, posts: posts});
  }


  render() {
    const { featuredPost, authorization, topTags } = this.props;
    const { posts } = this.state;

    return (
      <React.Fragment>
        <Head>
          <title>Zemuldo Blog - I write and Share my Experience.</title>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@zemuldo" />
          <meta name="twitter:creator" content="@zemuldo" />
          <meta name="twitter:title" content="Zemuldo Blog" />
          <meta name="twitter:description" content="Danstan Onyango ~ zemuldo. Software Engineer, Nairobi, Kenya. Passion mixed with enthusiasm and bundled together with Geekiness, served on port Awesomeness." />
          <meta name="twitter:image" content="https://zemuldo.com/images/site/site-blog.png" />

          <meta property='og:title' content="Zemuldo Blog" />
          <meta property="og:image" content="https://zemuldo.com/images/site/site-blog.png" />
          <meta property='og:url' content='https://zemuldo.com/blog' />

          <meta name="keywords" content="zemuldo, blog, danstan, danstan onyango, danstan otieno onyango, developer, engineer, software developer, software engineer, software developer nairobi, software engineer nairobi, linux, nodejs, software, zemuldo.com, programming, coder, nodejs, elixir, software engineer in nairobi, software developer in nairobi, top software engineers in kenya, elixir software engineer developer, nodejs engineer developer" />
        
          <meta name="description" content="Blog by Danstan Onyango, Software Engineer, Nairobi, Kenya. Tech articles, Tutorials and Reviews. Sharing content that inspires." />
        </Head>
        <Container style={{ color: 'white' }} maxWidth="md">

          <Menu authorization={authorization} />
        </Container>
        <Container style={{ color: 'white' }} maxWidth="md">
          <TopTags tags={topTags} onSelect={this.filterByTag} />
        </Container>
        <Container style={{ color: 'white' }} maxWidth="md">
          <ShouldRender if={!!featuredPost && !this.state.currentTag}>
            <FeaturedPost featuredPost={featuredPost}/>
          </ShouldRender>
          <Blogs _infiniteScroll={this.infiniteScroll} posts={posts} />
          <br />
          {this.state.fetching && <div style={{ flexGrow: 1, color: 'white' }}><LinearProgress /> </div>}
          <ShouldRender if={!posts || !posts[0]}>
            <NoContent/>
          </ShouldRender>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

Blog.propTypes = {
  router: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  authorization: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  user: PropTypes.object,
  featuredPost: PropTypes.object,
  topTags: PropTypes.array.isRequired,
  currentTag: PropTypes.string,
};

export default Entry(Blog);