import React from 'react';

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fileName: this.props.value.fileName,
            filePreviewURL: this.props.value.filePreviewURL, 
            handleChangeFile: this.props.value.handleChangeFile, 
            handleUploadFile: this.props.value.handleUploadFile, 
        };
    }

    getFileExtenstion = (fileName) => {
        return fileName.split('.').pop();
    }

    returnFilePreview = ({fileName, filePreviewURL}) => {
        const fileExtension = this.getFileExtenstion(fileName);
        if (['mp4', 'mov', 'avi', 'mkv'].includes(fileExtension)) {
            return (
                <>
                    <video width="320" height="240" controls>
                    <source src={filePreviewURL} type="video/mp4" />
                    </video>
                </>
            )
        } else { // '사진'
            return (
                <>
                    <img src = {filePreviewURL} alt = {filePreviewURL}/>
                </>
            )
        }
        
    }

    returnEmptyTag = () => {
        return (<></>)
    }

    render() {
        const {
            fileName,
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
                <button onClick={handleUploadFile}>사진 업로드</button>
                <br / >
                {filePreviewURL.length ? this.returnFilePreview({fileName, filePreviewURL}) : this.returnEmptyTag()}
            </>
        );
    }
}

export default Home;