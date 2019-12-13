import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageUpload.css';
import { getCookie } from '../../../utils';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '' };
  }

  /* ----- submit image ----- */

  async triggerPutImage(formData) {
    await fetch('/account/token', {
      method: 'GET',
      credential: 'include',
    });

    const csrftoken = getCookie('csrftoken');

    const response = await fetch(`/account/user/${this.props.userID}/image`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'X-CSRFToken': csrftoken,
      },
      body: formData,
    });

    if (response.status === 200) {
      window.alert('success image change');
      window.location.reload();
    } else {
      window.alert('fail image change');
    }
  }

  imageSubmit(e) {
    e.preventDefault();

    // TODO: do something with -> this.state.file
    const formData = new FormData();
    formData.append('image', this.state.file);

    // console.log('handle uploading-', this.state.imagePreviewUrl);
    this.triggerPutImage(formData);
  }

  /* ----- select image ----- */

  imageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  /* ----- render ----- */

  render() {
    const { imagePreviewUrl } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} alt="preview" />);
    } else {
      imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e) => this.imageSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={(e) => this.imageChange(e)}
          />
          <button
            className="submitButton"
            type="submit"
            onClick={(e) => this.imageSubmit(e)}
          >
          Upload Image
          </button>
        </form>
        <div className="imgPreview">
          {imagePreview}
        </div>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  userID: PropTypes.string,
};

ImageUpload.defaultProps = {
  userID: null,
};

export default ImageUpload;
