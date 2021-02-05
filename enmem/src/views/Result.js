import React from 'react';
import  youtubeThumbnail from 'youtube-thumbnail';

class Result extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            thumbnailURL: this.props.value.thumbnailURL,
            youtubeURL: this.props.value.youtubeURL,
            onClickHomeButton: this.props.value.onClickHomeButton,
            onClickShareButton: this.props.value.onClickShareButton,
        };
    }


    getYouTubeThumbnail = (youtubeURL) => {
        const thumbnail = youtubeThumbnail(youtubeURL);
        console.log(thumbnail);
        return thumbnail.high.url
    }

    render(){
        const {thumbnailURL, youtubeURL, onClickHomeButton, onClickShareButton} = this.state
        return (
            <>
                <h1> 결과 페이지 </h1>
                <div>
                <br />
                    <input type="button" value="홈으로" onClick={onClickHomeButton}/>
                    <br />
                    <input type="button" value="공유" onClick={onClickShareButton}/>
                    <br />
                </div>
                <div>
                    <a href={youtubeURL}>
                    <img src={this.getYouTubeThumbnail(youtubeURL)}
                        alt={youtubeURL} />
                    </a>
                    <br/>
                    <p> {youtubeURL} </p>
                </div>
            </>
        );
    }
}

export default Result;