import React from 'react';
import AWS, { ServerlessApplicationRepository } from 'aws-sdk'
import dummy_thumbnail from '../dummy_thumbnail.jpg';
import Result from './Result';
import Loading from './Loading';
import Home from './Home';


const albumBucketName = "media-query-mediabucket-1i4slys4cekco";
const bucketRegion = "ap-northeast-2";
const IdentityPoolId = "ap-northeast-2:c3883d87-fb89-4147-bb5f-69a1d8714a71";

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: albumBucketName }
});


class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isHomePage: true,
            isLoadingPage: false,
            isResultPage: false,
            file: {
                name: "",
                type: "",
                preview: "",
                raw: "",
            },
            resMusicThumbnailURL: "",
            resMusicYoutubeURL: "",
        };
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    handleChangeFile = (e) => {
        if (!e.target.files) {
            console.log("err!")
            return
        }
        if (e.target.files.length) {
            const fileName = this.generateRandomFileName()
            this.setState({
                file: {
                    name: fileName,
                    type: e.target.files[0].type,
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                }
            })
        }
    };

    handleUploadFile = (e) => {
        e.preventDefault();
        const {file} = this.state
        
        if (this.checkFileSize({fileSize: file.raw.size})) {
            alert("파일의 사이즈가 너무 큽니다! 10M이하로 넣어주세요");
            return
        }
        this.uploadFile({file: file.raw, fileName: file.name, completion: this.getResponseFromServer})
    };

    checkFileSize = ({fileSize}) => {
        const maxFileSize = 10 * 1024 * 1024;
        if (fileSize > maxFileSize) {
            return true
        }
        return false
    }

    generateRandomFileName = () => {
        return `${Math.floor(Math.random() * 100000000)}`;
    }

    uploadFile = ({file, fileName, completion}) => {
        // Use S3 ManagedUpload class as it supports multipart uploads
        const upload = new AWS.S3.ManagedUpload({
          params: {
            Bucket: albumBucketName,
            Key: fileName,
            Body: file
          }
        });
      
        const promise = upload.promise();
        
        promise
            .then(res => {
                completion();
                return;
            })
            .catch((e) => `err: ${e.message}`);
    }

    getResponseFromServer = async () => {
        // 서버에서 결과 API를 받아옵니다
        this.showLoadingPage()
        const _ = await this.sleep(2000)
        const res = {
            resMusicThumbnailURL: dummy_thumbnail,
            resMusicYoutubeURL:  "https://youtu.be/TgOu00Mf3kI"
        }
        this.showResultPage({data: res})
    }

    returnHomePage = () => {
        const {file} = this.state;
        const {type, preview} = file;
        const value = {
            type: type,
            preview: preview, 
            handleChangeFile: this.handleChangeFile, 
            handleUploadFile: this.handleUploadFile, 
        }
        return (<><Home key= {preview} value = {value}/></>)
    }

    returnLoadingPage = () => {
        return (<><Loading /></>)
    }

    returnResultPage = () => {
        const {resMusicThumbnailURL, resMusicYoutubeURL} = this.state;
        const value = {
            thumbnailURL: resMusicThumbnailURL,
            youtubeURL: resMusicYoutubeURL,
            onClickHomeButton: this.onClickHomeButton,
            onClickShareButton: this.onClickShareButton,
        }
        return (<><Result key={resMusicThumbnailURL + resMusicYoutubeURL} value = {value}/></>)
    }

    onClickHomeButton = () => {
        this.showHomePage()
    }

    onClickShareButton = () => {
        
    }

    showHomePage = () => {
        this.setState({
            isHomePage: true,
            isLoadingPage: false,
            isResultPage: false,
        });
    }

    showLoadingPage = () => {
        this.setState({
            isHomePage: false,
            isLoadingPage: true,
            isResultPage: false,
        });
    }

    showResultPage = ({data}) => {
        this.setState({
            isHomePage: false,
            isLoadingPage: false,
            isResultPage: true,
            resMusicThumbnailURL: data.resMusicThumbnailURL,
            resMusicYoutubeURL: data.resMusicYoutubeURL
        });
    }
    
    render() {
        const {isHomePage, isLoadingPage} = this.state;
        if (isHomePage) {
            return (
                <>{this.returnHomePage()}</>
            );
        } else if (isLoadingPage) {
            return (
                <>{this.returnLoadingPage()}</>
            );
        } else { // isResultPage
            return (
                <>{this.returnResultPage()}</>
            );
        }
    }
}

export default Main;