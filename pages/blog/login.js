import React from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import { Link } from '@material-ui/core';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import IfLoggedIn from '../../components/IfLoggedIn';
import PleaseWait from '../../components/please_wait';
import Entry from '../../components/entry';
import PageLayout from '../../components/PageLayout';

const api_url = process.env.API_URL;
const base_url = process.env.UI_URL;

class Login extends React.Component {

  componentDidMount(){
    if (this.props.query.token) window.location.reload();
  }

  render() {
    const { query, loggingIn } = this.props;
    if (loggingIn || query.token) return <PleaseWait/>;
    return (
      <>

        <Head>
          <title>I&apos;m Danstan ~ Zemuldo</title>
        </Head>
        <PageLayout style={{ marginTop: '30%' }}>
          <Grid style={{ marginTop: '30%' }} justify="space-between" container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Link>
                <h1 className="color-6">Twitter</h1>
              </Link>
              <hr className="hr-opposite" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link href={`${api_url}/user/auth/github?redirectTo=${query.redirectTo || base_url}`}>
                <h1 className="color-6">Github</h1>
              </Link>
              <hr />
            </Grid>
          </Grid>
        </PageLayout>
      </>
    );
  }
}

Login.propTypes = {
  query: PropTypes.object.isRequired,
  loggingIn: PropTypes.bool,
  loggedIn: PropTypes.bool
};

export const LoginComponent = withRouter(Login);

export default Entry(IfLoggedIn(withRouter(Login)));
