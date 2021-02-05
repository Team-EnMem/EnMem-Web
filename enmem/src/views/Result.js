import React from 'react';
class Result extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            youtubeID: this.props.value.youtubeID,
            artist: this.props.value.artist,
            title: this.props.value.title,
            preview: this.props.value.preview,
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


    render(){
        const {youtubeID, artist, title, preview, onClickHomeButton, onClickShareButton} = this.state
        return (
            <>
                <h1> 결과 페이지 </h1>
                <div>
                    <br />
                    <input type="button" value="홈으로" onClick={onClickHomeButton}/>
                    <br />
                    </div>
                <div>
                    <a href={this.getYouTubeURL(youtubeID)}>
                    <img src={preview} width="500" height="500"
                        alt={this.getYouTubeURL(youtubeID)} />
                    </a>
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