import React from 'react';

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            photoPreviewURL: this.props.value.photoPreviewURL, 
            videoPreviewURL: this.props.value.videoPreviewURL, 
            handleChangePhoto: this.props.value.handleChangePhoto, 
            handleUploadPhoto: this.props.value.handleUploadPhoto, 
            handleChangeVideo: this.props.value.handleChangeVideo, 
            handleUploadVideo: this.props.value.handleUploadVideo
        };
    }

    returnPhotoPreview = (photoPreviewURL) => {
        console.log("!!")

        return (
            <>
                <img src = {photoPreviewURL}/>
            </>
        )
    }

    returnVideoPreview = (videoPreviewURL) => {
        console.log(videoPreviewURL)
        return (
            <>
                <video width="320" height="240" controls>
                <source src={videoPreviewURL} type="video/mp4" />
                </video>
            </>
        )
    }

    returnEmptyTag = () => {
        return (<></>)
    }

    render() {
        const {
            photoPreviewURL, 
            videoPreviewURL, 
            handleChangePhoto, 
            handleUploadPhoto, 
            handleChangeVideo, 
            handleUploadVideo
        } = this.state

        return (
            <>
                <h1>홈 화면</h1>
                <input
                    type="file"
                    id="upload-photo-button"
                    onChange={handleChangePhoto}
                />
                <br />
                <button onClick={handleUploadPhoto}>사진 업로드</button>
                <br />
                <input
                    type="file"
                    id="upload-video-button"
                    onChange={handleChangeVideo}
                />
                <br />
                <button onClick={handleUploadVideo}>동영상 업로드</button>
                <br / >
                {photoPreviewURL.length ? this.returnPhotoPreview(photoPreviewURL) : this.returnEmptyTag()}
                <br / >
                {videoPreviewURL.length ? this.returnVideoPreview(videoPreviewURL) : this.returnEmptyTag()}
            </>
        );
    }
}

export default Home;