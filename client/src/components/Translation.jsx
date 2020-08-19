import React from 'react';
import axios from 'axios';

class Translation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: {
        SP: 'Traducir',
        FR: 'Traduire',
        KR: '번역',
        JP: '訳す',
      },
    };
  }

  render() {
    const { getText } = this.props;
    const { selectedLanguage } = this.props;
    const { translate } = this.state;

    return (
      <div id="translation-body">
        <button className="submit-btn" onClick={getText}>
          {translate[selectedLanguage]}
        </button>
        <h1>This is hard coded text. Please change this later to reflect the returned translation from the database.</h1>
      </div>
    );
  }
}

export default Translation;
