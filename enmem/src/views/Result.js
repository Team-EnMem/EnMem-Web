import React from 'react';
class Result extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            fileKind: this.props.value.kind,
            filePreviewURL: this.props.value.preview, 
            youtubeID: this.props.value.youtubeID,
            artist: this.props.value.artist,
            title: this.props.value.title,
            onClickHomeButton: this.props.value.onClickHomeButton,
            onClickShareButton: this.props.value.onClickShareButton,
        };
    }

    getYouTubeEmbedURL = (youtubeID) => {
        return "https://www.youtube.com/embed/" + youtubeID + "?start=60&autoplay=1&loop=3"
    }

    getYouTubeURL = (youtubeID) => {
        return "https://www.youtube.com/watch/" + youtubeID
    }

    returnFilePreview = ({fileKind, filePreviewURL}) => {
        console.log(fileKind)
        console.log(filePreviewURL)
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
                    <a href={this.getYouTubeURL(this.state.youtubeID)}>
                    <img src = {filePreviewURL} alt = {this.getYouTubeURL(this.state.youtubeID)} width="500" height="500"/>
                    </a>
                </>
            )
        }
        
    }

    render(){
        const {fileKind, youtubeID, artist, title, filePreviewURL, onClickHomeButton, onClickShareButton} = this.state
        return (
            <>
                <h1> 결과 페이지 </h1>
                <div>
                    <br />
                    <input type="button" value="홈으로" onClick={onClickHomeButton}/>
                    <br />
                    </div>
                <div>
                    {filePreviewURL.length ? this.returnFilePreview({fileKind, filePreviewURL}) : this.returnEmptyTag()}
                    <h4>{artist}</h4>
                    <h4>{title}</h4>
                    <br/>
                    <iframe style= {{visibility: 'hidden'}} width="0" height="0" src={this.getYouTubeEmbedURL(youtubeID)} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    <input type="button" value="공유" onClick={onClickShareButton}/>
                    <br />
                </div>
            </>
        );
    }
}

export default Result;