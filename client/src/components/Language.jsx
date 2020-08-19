import React from 'react';
import axios from 'axios';

class Language extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleChange } = this.props;
    return (
      <div id="language-selection">
        <form id="language-drop-down">
          <label>
            Select language
            <select onChange={handleChange}>
              <option value="SP">Español</option>
              <option value="FR">Français</option>
              <option value="KR">한국어</option>
              <option value="JP">日本語</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

export default Language;