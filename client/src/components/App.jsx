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
      image: '',
      imageClass: '',
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
    console.log('Uploaded Image Info : ', event.target.files[0])
    // Display the selected image to the user
    this.setState({
      image: event.target.files[0],
      imagePreivew: URL.createObjectURL(event.target.files[0])
    });
  };

  fetchTranslation() {
    const { image } = this.state;
    const formData = new FormData();
    formData.append('file', image);
    console.log(formData); //

    axios.post('/api/test', formData)
    .then(({ data }) => {
      console.log(data);
      this.setState({ imageClass: data });
    })
    .catch((error) => {
      console.log('fetchTranslation Error : ', error);
    })
  };

  render() {
    const { selectedLanguage } = this.state;
    const { imagePreivew } = this.state;

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
        />
      </div>
    );
  };
};

export default App;
