import React from 'react';
import { storiesOf } from '@storybook/react';
import Index from '../pages/index';
import SocialSites from '../src/components/home/social_sites';
import Footer from '../src/footer';
import TerminalMe from '../src/components/home/terminal_me';

storiesOf('Home Page', module)
  .add('Normal', () => (
    <Index/>
  ))
  .add('Social Sites', () => (
    <SocialSites/>
  ))
  .add('Footer', () => (
    <Footer/>
  ))
  .add('TerminalMe', () => (
    <TerminalMe/>
  ));
