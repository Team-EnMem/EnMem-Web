import React from 'react';

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
                    <img src={thumbnailURL}
                        alt="Visit the MDN site" />
                    </a>
                    <br/>
                    <p> {youtubeURL} </p>
                </div>
            </>
        );
    }
}

export default Result;