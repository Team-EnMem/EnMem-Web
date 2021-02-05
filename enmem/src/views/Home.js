import React from 'react';


class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fileKind: this.props.value.kind,
            filePreviewURL: this.props.value.preview, 
            handleChangeFile: this.props.value.handleChangeFile, 
            handleUploadFile: this.props.value.handleUploadFile, 
        };
    }

    returnFilePreview = ({fileKind, filePreviewURL}) => {
        if (['video'].includes(fileKind)) {
            return (
                <>
                    <video width="500" height="500" controls>
                    <source src={filePreviewURL} type="video/mp4" />
                    </video>
                </>
            )
        } else { // '사진'
            return (
                <>
                    <img src = {filePreviewURL} alt = {filePreviewURL} width="500" height="500"/>
                </>
            )
        }
        
    }


    returnEmptyTag = () => {
        return (<></>)
    }

    render() {
        const {
            fileKind,
            filePreviewURL, 
            handleChangeFile, 
            handleUploadFile, 
        } = this.state

        return (
            <>
                <h1>홈 화면</h1>
                <input
                    type="file"
                    id="upload-photo-button"
                    onChange={handleChangeFile}
                />
                <br />
                <button onClick={handleUploadFile}>사진/영상 업로드</button>
                <br / >
                {filePreviewURL.length ? this.returnFilePreview({fileKind, filePreviewURL}) : this.returnEmptyTag()}
            </>
        );
    }
}

export default Home;