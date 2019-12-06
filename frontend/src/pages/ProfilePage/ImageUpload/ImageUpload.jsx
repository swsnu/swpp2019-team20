import React from 'react';
import './ImageUpload.css'

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '' };
  }

  imageSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
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