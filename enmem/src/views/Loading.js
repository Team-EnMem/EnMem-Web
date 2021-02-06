import React from 'react';
import styled from "styled-components";

class Loading extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
        };
    }

    render(){
        return (
            <BContainer>
                    <Container>
                        <Backimg_2></Backimg_2>
                        <Backimg_3></Backimg_3>
                        <Backimg_4></Backimg_4>
                        <Backimg></Backimg>
                        <Buttonimg></Buttonimg>
                        <Text_1>당신의 추억을 매칭중입니다</Text_1>
                    </Container>
            </BContainer>
        );
    }
}

const Text_1 = styled.text`
position: absolute;
width: 207px;
height: 27px;
left: 84px;
top: 450px;
font-family: 'Spoqa Han Sans Neo', 'sans-serif';
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 27px;
/* identical to box height */

text-align: center;

color: #373445;
`;

const BContainer = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: #E5E5E5;
`;

const Buttonimg = styled.div`
position: absolute;
width: 180px;
height: 180px;
left: 97px;
top: 186px;
background: url(https://media.giphy.com/media/fEEiXQPMTjTgeTtxfU/giphy.gif);
background-size: cover;
z-index: 1;
`;

const Styledbutton_2 = styled.button`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 16px 40px;
position: absolute;
width: 161px;
height: 53px;
left: 107px;
top: 679px;
background: rgba(255, 255, 255, 0.6);
box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.08);
border-radius: 40px;
`;

const Styledbutton = styled.button`
position: absolute;
width: 180px;
height: 180px;
left: 97px;
top: 186px;
border-radius: 50%;
background: #FFFFFF;
background: url(https://i.imgur.com/Kh6kcqJ.png);
box-shadow: 0px 0px 30px rgba(248, 118, 91, 0.2);
background-size: cover;
z-index: 0;
`;

const Container = styled.div`
position: relative;
width: 375px;
height: 812px;
border: 2px solid black;
background: #FFFFFF;
background-size: cover;
`;

const Backimg_2 = styled.div`
position: absolute;
width: 81px;
height: 81px;
left: 16px;
top: 313px;
border-radius: 50%;
background: rgba(222, 233, 255, 0.6);
`;

const Backimg_3 = styled.div`
position: absolute;
width: 337px;
height: 337px;
left: 97px;
top: -102px;
background: rgba(222, 233, 255, 0.25);
border-radius: 50%;
`;

const Backimg_4 = styled.div`
position: absolute;
width: 127px;
height: 127px;
left: 224px;
top: 159px;
border-radius: 50%;
background: rgba(222, 233, 255, 0.35);
`;

const Backimg = styled.div`
position: absolute;
width: 221px;
height: 221px;
left: -153px;
top: 159px;
border-radius: 50%;
background: #FFFF00;
background: rgba(222, 233, 255, 0.4);
`;

export default Loading;