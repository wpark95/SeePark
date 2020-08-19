import React from 'react';
import axios from 'axios';
import InputImage from './InputImage.jsx';
import Translation from './Translation.jsx';
import Language from './Language.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: '',
      image: '',
      imageClass: '',
    };
    this.handleLanguageSelection = this.handleLanguageSelection.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  };

  handleLanguageSelection(event) {
    this.setState({
      selectedLanguage: event.target.value
    })
  };

  postText() {
    const { image } = this.state;
    axios.post('/test', image)
    .then((response) => {
      this.setState({
        imageClass: response.data.classification
      });
      console.log('Classification Returned :', response.data.classification);
    })
  };

  handleImageUpload(event) {
    console.log(event.target.files[0])
    this.setState({
      image: URL.createObjectURL(event.target.files[0])
    })
  };

  render() {
    const { selectedLanguage } = this.state;
    const { image } = this.state;

    return (
      <div id="components">
        <Language handleChange={this.handleLanguageSelection} />
        <InputImage
          selectedLanguage={selectedLanguage}
          displayiImage={image}
          imageHandler={this.handleImageUpload}
        />
        <Translation
          selectedLanguage={selectedLanguage}
          getText={this.postText}
        />
      </div>
    );
  };
};

export default App;