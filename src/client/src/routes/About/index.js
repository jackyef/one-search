import React, { Component } from 'react';
import { Card } from 'unify-react-mobile';
import 'unify-react-mobile/build/styles.css';

import ImageElement from '../../components/ImageElement';
import './styles.css';

const profilePicture = 'https://avatars3.githubusercontent.com/u/7252454?s=400&v=4';
class About extends Component {
  render() {
    return (
      <div className='app-content-container'>
        <Card subheader="About">
          <ImageElement className='about--picture' src={profilePicture} />
          <Card container>
            Jacky Efendi is tech enthusiast who happens to love the English language too. 

            Currently working as a software engineer at <a href='https://tokopedia.com' target='_blank' rel='noopener noreferrer'>Tokopedia</a>,
            mostly with React, Redux, Apollo, and GraphQL.
          </Card>
          <Card container>
            I am always open to listen to opportunities, contributing to open-source projects, or some freelance works.
            <p>
              You can connect with me on: 
            </p>
            <ul>
              <li><a target='_blank' rel='noopener noreferrer' href='https://linkedin.com/in/jackyef'>LinkedIn</a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://github.com/jackyef'>GitHub (jackyef)</a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://twitter.com/jacky_efendi'>Twitter (@jacky_efendi)</a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://instagram.com/_u/jackyef_'>Instagram (@jackyef_)</a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://facebook.com/zhouyongchao'>Facebook</a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://codepen.io/jackyef/'>CodePen</a></li>
            </ul>
          </Card>
        </Card>
      </div>
    );
  }
}

export default About;
