import React from 'react';
import axios from 'axios';

class InputImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upload: {
        SP: 'subir foto',
        FR: 'charger une photo',
        KR: '사진 첨부',
        JP: '写真をアップロードする',
      },
    };
  };

  render() {
    const { selectedLanguage } = this.props;
    const { imageHandler } = this.props;
    const { displayiImage } = this.props;
    const { upload } = this.state;

    return (
      <div id="image-component">
        <div className="submit-btn">
          <label
            htmlFor="image-upload"
          >
            {upload[selectedLanguage]}
          </label>
          <input
            type='file'
            id='image-upload'
            onChange={imageHandler}
            style={{display:'none'}}
          />
        </div>
        <div className="image-preview-box">
          <img id="image-preview" src={displayiImage}></img>
        </div>
      </div>
    );
  };
};

export default InputImage;
