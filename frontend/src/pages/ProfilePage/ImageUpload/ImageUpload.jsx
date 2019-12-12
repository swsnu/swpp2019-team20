import React, { Component } from 'react';
import './ImageUpload.css'
import { getCookie } from '../../../utils';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '' };
  }

  triggerPutImage = async (formData) => {
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

    if ( response.status === 200) {
      window.alert('success image change');
      window.location.reload();
    } else {
      window.alert('fail image change');
    }
  }

  imageSubmit(e) {
    e.preventDefault();

    // TODO: do something with -> this.state.file
    let formData = new FormData();
    formData.append('image', this.state.file)
    
    //console.log('handle uploading-', this.state.imagePreviewUrl);
    this.triggerPutImage(formData);
  }

  imageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e) => this.imageSubmit(e)}>
          <input className="fileInput"
            type="file"
            onChange={(e) => this.imageChange(e)} />
          <button className="submitButton"
            type="submit"
            onClick={(e) => this.imageSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {imagePreview}
        </div>
      </div>
    )
  }
}

export default ImageUpload;