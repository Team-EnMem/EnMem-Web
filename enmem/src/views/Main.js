import React from 'react';
import Result from './Result';
import Loading from './Loading';
import Home from './Home';

import AWS, { ServerlessApplicationRepository } from 'aws-sdk'
import { BlobServiceClient } from "@azure/storage-blob";
import YTSearch from 'youtube-api-search';
import html2canvas from 'html2canvas';
import fetch from 'node-fetch';

// // 구글 번역 API Key
// var api = "AIzaSyCGfStTcE6Tl-00sqxmJqIjM1AGaCk1oKc";
// var googleTranslate = require('google-translate')(api);

// Last.fm API Key
const LastFM = require('last-fm')
const lastfm = new LastFM('6442e62dddbf0137f91a1862942fbbe2', {}) 

// Youtube API Key
const API_KEY = 'AIzaSyCGfStTcE6Tl-00sqxmJqIjM1AGaCk1oKc'         
const albumBucketName = "media-query-mediabucket-1i4slys4cekco";
const bucketRegion = "ap-northeast-2";
const IdentityPoolId = "ap-northeast-2:c3883d87-fb89-4147-bb5f-69a1d8714a71";

// Azure API Key
let subscriptionKey = '570122bd4a134b4ab9783831d345efd6'
let endpoint = 'https://hackathon-face-recog.cognitiveservices.azure.com/face/v1.0/detect'

// AWS s3 설정
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
                kind: "",
                type: "",
                preview: "",
                raw: "",
            },
            trackList: {},        // Track list : arr[30]
            topTrackName: "",     // Track name of first search result
            topTrackArtist: "",   // Track aritst of first search result
            topTrackKeyword: "",  // Track keyword 'music <track name> <artist name>'
            videos: {},           // topTrackKeyword's youtube search result : arr[5]
            topVideoID: ""        // video ID of first youtube search result
        };
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    handleChangeFile = (e) => {
        if (!e.target.files) {
            console.log("파일이 존재하지 않습니다")
            return
        }
        if (e.target.files.length) {
            const fileName = this.generateRandomFileName()
            this.setState({
                file: {
                    name: fileName,
                    kind: e.target.files[0].type.split('/').shift(),
                    type: e.target.files[0].name.split('.').pop(),
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                }
            })
        }
    };

    handleUploadFile = (e) => {
        e.preventDefault();
        const {file} = this.state
        if (this.checkFileType({fileType: file.type})) {
            alert("지원하지 않는 파일 타입입니다!")
            return
        }
        if (this.checkFileSize({fileSize: file.raw.size})) {
            alert("파일의 사이즈가 너무 큽니다! 10Mbyte이하로 넣어주세요");
            return
        }
        this.uploadFileToAWS({file: file.raw, fileName: file.name});
    };

    checkIsVideo = ({fileType}) => {
        if (['mp4', 'mov', 'flv'].includes(fileType)) {
            return true
        }
        return false
    }

    checkFileType = ({fileType}) => {
        if (['jpg', 'png', 'mp4', 'mov', 'flv'].includes(fileType)) {
            return false
        }
        return true
    }

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

    uploadFileToAWS = async ({file, fileName}) => {
        // Use S3 ManagedUpload class as it supports multipart uploads
        const key = fileName + '.' + file.name.split('.').pop()
        const upload = new AWS.S3.ManagedUpload({
          params: {
            Bucket: albumBucketName,
            Key: key,
            Body: file
          }
        });
      
        try {
            const uploaded = await upload.promise();
            await this.getResponseFromServer({fileNameWithType: key, fileType: file.name.split('.').pop()});
        } catch (error) {
            console.log(error.message);
        }
        
    }

    uploadFileToAzure = async (fileNameWithType) => {
        console.log(fileNameWithType);
        const imageURL = `https://media-query-mediabucket-1i4slys4cekco.s3.ap-northeast-2.amazonaws.com/${fileNameWithType}`;
        const params = new URLSearchParams({ 
            detectionModel: 'detection_01',
            returnFaceLandmarks: false,
            returnFaceAttributes: 'emotion',
            recognitionModel: 'recognition_03',
            returnRecognitionModel: false,
            faceIdTimeToLive: 86400,
            returnFaceId: true
        })
        let json = {}
        const body = JSON.stringify({
            url: imageURL,
        })
        try {
            const res = await fetch(endpoint + "?" + params, {
                method: 'post', 
                headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey, 'Content-type': 'application/json' }, 
                body: body,
            });
            console.log(res)
            json = await res.json();
        } catch (error) {
            console.log(error)
        }
        if (json.length >= 1) {
            const obj = json[0].faceAttributes.emotion;
            let arr = Object.values(obj);
            let max = Math.max(...arr);
            if (max === 0) {
                return "NO_KEYWORD"
            } else {
                return Object.keys(obj).find(key => obj[key] === max);
            }
        } else {
            return "NO_KEYWORD"
        }
    }

    getRandomKeyWord = async (response) => {
        const labels = response.labels;
        const firstIndex = this.getRandomInt(0, labels.length);
        var secondIndex = this.getRandomInt(0, labels.length);
        while (firstIndex === secondIndex) {
            secondIndex = this.getRandomInt(0, labels.length);
        }
        var firstKeyword = labels[firstIndex];
        var secondKeyword = labels[secondIndex];
        // firstKeyword = await this.getTranslatedKeyword(firstKeyword);
        // secondKeyword = await this.getTranslatedKeyword(secondKeyword);
        return {firstKeyword, secondKeyword};
    }

    // getTranslatedKeyword = (keyword) => {
    //     return new Promise(resolve => {
    //         googleTranslate.translate(keyword, 'ko', function(err, translation) {
    //             resolve(translation.translatedText);
    //         })
    //     })   
    // }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

    waitForServer = async(fileType) => {
        const isVideo = await new Promise(resolve => {
            resolve(this.checkIsVideo({fileType: fileType}));
        })
        if (isVideo) {
            console.log("video~~~")
            await this.sleep(35000);
        } else {
            console.log("image~~~")
            await this.sleep(5000);
        }
    }

    getResponseFromServer = async ({fileNameWithType, fileType}) => {
        this.showLoadingPage()
        console.log(fileType)
        try {
            await this.waitForServer(fileType);
            const response = await this.getKeywordFromServer(fileNameWithType)
            var emotionKeyword = await this.uploadFileToAzure(fileNameWithType);
            var {firstKeyword, secondKeyword} = await this.getRandomKeyWord(response);
            if (emotionKeyword !== "NO_KEYWORD") {
                secondKeyword = emotionKeyword
            }
            console.log(emotionKeyword);
            console.log(`${firstKeyword} ${secondKeyword}`);
            this.fetchTracklist(`${firstKeyword} ${secondKeyword}`);
        } catch (error) {
            console.log(error)
        }

    }

    getKeywordFromServer = async(fileNameWithType) => {
        let headers = new Headers();
        let json = {};
        const url = `https://th5a2rg7k4.execute-api.ap-northeast-2.amazonaws.com/api/${fileNameWithType}`
        try {
            const res = await fetch(url, {method: 'GET', headers: headers, });
            json = await res.json();
            console.log(json)
        } catch (error) {
            console.log(error)
        }
        return json
    }

    returnHomePage = () => {
        const {file} = this.state;
        const {kind, type, preview} = file;
        const value = {
            kind: kind,
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
        const {file, topVideoID, topTrackName, topTrackArtist} = this.state;
        const {kind, type, preview} = file;
        const value = {
            kind: kind,
            type: type,
            preview: preview,
            youtubeID: topVideoID,
            artist: topTrackArtist,
            title: topTrackName,
            onClickHomeButton: this.onClickHomeButton,
            onClickShareButton: this.onClickShareButton,
        }
        return (<><Result key={topVideoID + topTrackArtist + topTrackName} value = {value}/></>)
    }

    onClickHomeButton = () => {
        this.showHomePage()
    }

    onClickShareButton = () => {
        this.shareForFacebook();
    }

    shareForFacebook = () => {
        // html2canvas(document.getElementById('capture')).then(function(canvas) {
        // });

        const imgTag = document.createElement('img');
        imgTag.setAttribute('src', this.state.file.preview);

        document.getElementById('metaURL')
        document.getElementById('metaType')
        document.getElementById('metaTitle')
        document.getElementById('metaDescription').setAttribute('content', `추천 받으신 음악은 ${this.state.topTrackName}입니다`)
        document.getElementById('metaImage').setAttribute('content', `${this.state.file.preview}`)
        const cUrl = `http://www.facebook.com/sharer/sharer.php?u=https://enmem.azurewebsites.net`
        window.open(cUrl,'','width=600,height=300,top=100,left=100,scrollbars=yes');
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

    showResultPage = ({videos, topVideoID}) => {
        this.setState({
            isHomePage: false,
            isLoadingPage: false,
            isResultPage: true,
            videos: videos,
            topVideoID: topVideoID,
        });
    }

    // Search by keyword in Last.fm and get tracklist
    fetchTracklist = (keyword) => {
        lastfm.trackSearch({ q: keyword }, (err, data) => {
            if (err) {
                console.error(err)
            }
            else {
                this.updateTopTrackinfo(data)
            }
        });
    }

      // Set states
    updateTopTrackinfo = (data) => {
        let trackName, trackArtist;
        if (!data.result[0]) {
            trackName = "Kpop";
            trackArtist = "Kpop";
        } else {
            trackName = data.result[0].name;
            trackArtist = data.result[0].artistName;
        }
        this.setState({
            trackList: data.result,
            topTrackName: trackName,
            topTrackArtist: trackArtist,
            topTrackKeyword: 'music'.concat(' ', JSON.stringify(trackName).replace(/\"/gi, ""), ' ', JSON.stringify(trackArtist).replace(/\"/gi, ""))
        }, () => {
            this.youtubeVideoSearch()
        });
    }

    // Search by keyword in Youtube and get vedio ID
    youtubeVideoSearch = () => {
        YTSearch({key: API_KEY, term: this.state.topTrackKeyword}, (videos) => {
            let videoID;
            if (!videos[0]) {
                videoID = "axDz_3wikkk"
            }
            else if (!videos[0].id) {
                videoID = "axDz_3wikkk"
            }
            else {
                videoID = videos[this.getRandomInt(0, videos.length)].id.videoId;
            }

            this.showResultPage({videos: videos, topVideoID: videoID});
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