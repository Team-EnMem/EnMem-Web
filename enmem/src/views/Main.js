import React from 'react';
import AWS, { ServerlessApplicationRepository } from 'aws-sdk'
import Result from './Result';
import Loading from './Loading';
import Home from './Home';
import fetch from 'node-fetch';
import YTSearch from 'youtube-api-search'
var api = "AIzaSyCGfStTcE6Tl-00sqxmJqIjM1AGaCk1oKc";
var googleTranslate = require('google-translate')(api);

const LastFM = require('last-fm')
const lastfm = new LastFM('6442e62dddbf0137f91a1862942fbbe2', {}) // Last.fm API Key
const API_KEY = 'AIzaSyBu0Mxg6dWgI1yu3RH0Bu23ul0Hj8F6ByE'         // Youtube API Key

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
            alert("파일의 사이즈가 너무 큽니다! 10M이하로 넣어주세요");
            return
        }
        this.uploadFile({file: file.raw, fileName: file.name})
    };

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

    uploadFile = ({file, fileName}) => {
        // Use S3 ManagedUpload class as it supports multipart uploads
        const key = fileName + '.' + file.name.split('.').pop()
        const upload = new AWS.S3.ManagedUpload({
          params: {
            Bucket: albumBucketName,
            Key: key,
            Body: file
          }
        });
      
        const promise = upload.promise();
        promise
            .then(res => {
                console.log(key)
                this.getResponseFromServer(key);
                return;
            })
            .catch((e) => `err: ${e.message}`);
    }

    getRandomKeyWord = async (response) => {
        const labels = response.labels;
        console.log(labels)
        console.log(labels.length)
        const firstIndex = this.getRandomInt(0, labels.length);
        var secondIndex = this.getRandomInt(0, labels.length);
        while (firstIndex === secondIndex) {
            secondIndex = this.getRandomInt(0, labels.length);
        }
        var firstKeyword = labels[firstIndex];
        var secondKeyword = labels[secondIndex];
        // firstKeyword = await this.getTranslatedKeyword(firstKeyword);
        // secondKeyword = await this.getTranslatedKeyword(secondKeyword);
        console.log(firstKeyword)
        console.log(secondKeyword)
        return {firstKeyword, secondKeyword};
    }

    getTranslatedKeyword = (keyword) => {
        return new Promise(resolve => {
            googleTranslate.translate(keyword, 'ko', function(err, translation) {
                resolve(translation.translatedText);
            })
        })   
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

    getResponseFromServer = async (fileNameWithType) => {
        this.showLoadingPage()
        try {
            const __ = await this.sleep(3000);
            const response = await this.getKeywordFromServer(fileNameWithType)
            const {firstKeyword, secondKeyword} = await this.getRandomKeyWord(response);
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
        } catch (error) {
            console.log(error)
        } finally {
            console.log("end");
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
        const value = {
            youtubeID: topVideoID,
            artist: topTrackArtist,
            title: topTrackName,
            preview: file.preview,
            onClickHomeButton: this.onClickHomeButton,
            onClickShareButton: this.onClickShareButton,
        }
        return (<><Result key={topVideoID + topTrackArtist + topTrackName} value = {value}/></>)
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
        console.log(data)
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
            this.videoSearch()
        });
    }

    // Search by keyword in Youtube and get vedio ID
    videoSearch = () => {
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