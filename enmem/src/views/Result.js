import React from 'react';
import styled from "styled-components";
import homebutton from "../assets/btn_home.png";
import sharebutton from "../assets/btn_share.png";

class Result extends React.PureComponent {

    constructor(props){
        super(props);
        console.log(props)
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
                    <video width="350" height="350" controls>
                    <source src={filePreviewURL} type="video/mp4" />
                    </video>
                </>
            )
        }
    }

    render(){
        const {fileKind, youtubeID, artist, title, filePreviewURL, onClickHomeButton, onClickShareButton} = this.state
        return (
            <>
                <BContainer>
                    <ContainerA>
                        <Container>
                            <Blacklayer>
                                <div>
                                    <FilePreview>
                                        {filePreviewURL.length ? this.returnFilePreview({fileKind, filePreviewURL}) : this.returnEmptyTag()}
                                    </FilePreview>
                                    <a href={this.getYouTubeURL(youtubeID)}></a>
                                    <Text_1>{artist}</Text_1>
                                    <Text_2>{title}</Text_2>
                                    <iframe style= {{visibility: 'hidden'}} width="0" height="0" src={this.getYouTubeEmbedURL(youtubeID)} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                    <Styledbutton_1 backgroundImage={homebutton} onClick={onClickHomeButton}/>
                                    <Styledbutton_2 backgroundImage={sharebutton} onClick={onClickShareButton}/>
                                </div>
                            </Blacklayer>
                        </Container>
                    </ContainerA>
                </BContainer>
            </>
        );
    }
}

const FilePreview = styled.div`
position: absolute;
left: 12px;
top: 220px;
`

const Text_1 = styled.text`
position: absolute;
width: 220px;
height: 27px;
left: 46px;
top: 100px;

font-family: SpoqaHanSans;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 27px;
/* identical to box height */

text-align: left;
letter-spacing: -0.04em;

color: #FFFFFF;
`;

const Text_2 = styled.text`
position: absolute;
width: 220px;
height: 36px;
left: 46px;
top: 135px;

font-family: SpoqaHanSans;
font-style: normal;
font-weight: bold;
font-size: 24px;
line-height: 36px;
/* identical to box height */

text-align: left;
letter-spacing: -0.04em;

color: #FFFFFF;
`

const Styledbutton_1 = styled.button`
position: absolute;
width: 60px;
height: 60px;
left: 291px;
top: 636px;
border: none;
background: url(${homebutton});
background-size: cover;
z-index: 1;

filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));
`

const Styledbutton_2 = styled.button`
position: absolute;
width: 60px;
height: 60px;
left: 291px;
top: 692px;
border: none;
background: url(${sharebutton});
background-size: cover;
z-index: 1;

filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));
`

const BContainer = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: #E5E5E5;
`;

const Blacklayer = styled.div`
position: relative;
width: 375px;
height: 812px;
background: rgba(0, 0, 0, 0.3);
background-size: cover;
`;

const ContainerA = styled.div`
position: relative;
width: 375px;
height: 812px;
border: 2px solid black;
background: url(https://media.giphy.com/media/wSYE7n6pk9dqRXzitR/giphy.gif);
background-size: cover;
`;

const Container = styled.div`
position: relative;
width: 375px;
height: 812px;
border: 2px solid black;
background: url(${props => props.children._owner.memoizedProps.value.preview}) no-repeat center center/cover;
`;

export default Result;