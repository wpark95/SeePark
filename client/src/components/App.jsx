import React from 'react';
import axios from 'axios';
import InputImage from './InputImage.jsx';
import Translation from './Translation.jsx';
import Language from './Language.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'SP',
      imagePreivew: '',
      imageData: '',
      imageTranslation: '',
    };
    this.handleLanguageSelection = this.handleLanguageSelection.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.fetchTranslation = this.fetchTranslation.bind(this);
  };

  handleLanguageSelection(event) {
    this.setState({
      selectedLanguage: event.target.value
    });
  };

  handleImageUpload(event) {
    this.setState({
      imageData: event.target.files[0],
      imagePreivew: URL.createObjectURL(event.target.files[0]) // This is for displaying selected image to user
    });
  };


  fetchTranslation() {
    const { imageData } = this.state;
    const { imagePreivew } = this.state;
    const formData = new FormData();
    formData.append('file', imageData);

    axios.post('/api/test', formData)
    .then(({ data }) => {
      console.log(data[0].class);
      this.setState({ imageTranslation: data[0].class });
    })
    .catch((error) => {
      console.log('fetchTranslation Error : ', error);
    })
  };

  render() {
    const { selectedLanguage } = this.state;
    const { imagePreivew } = this.state;
    const { imageTranslation } = this.state;

    return (
      <div id="components">
        <Language handleChange={this.handleLanguageSelection} />
        <InputImage
          selectedLanguage={selectedLanguage}
          displayiImage={imagePreivew}
          imageHandler={this.handleImageUpload}
        />
        <Translation
          selectedLanguage={selectedLanguage}
          getText={this.fetchTranslation}
          translatedText={imageTranslation}
        />
      </div>
    );
  };
};

export default App;
