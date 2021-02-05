import React from 'react';
import Main from './Main';
import styled from 'styled-components';

class Onboarding extends React.Component {
​
    constructor(props){
        super(props);
​
        this.state = {
            isOnboardingPage: true,
        };
    }
​
    componentDidMount() {
​
    }
​
    componentDidUpdate(preProps, prevState) {
​
    }
​
    componentWillUnmount() {
​
    }
​
    onClickStartButton = () => {
        this.showHomePage()
    }
​
    showHomePage = () => {
        this.setState({
            isOnboardingPage: false
        });
    }
​
    returnOnboardingPage = () => {
        return (
                <BContainer>
                    <Container>
                
                    <div>
                        
                            <Text_1>탭하여 사진이나 영상을 업로드 해보세요
                        추억에 맞는 음악을 찾아드립니다</Text_1>
                        <Text_2>당신을 위한 추억증폭기 </Text_2>
                        
                        <Styledbutton onClick={this.onClickStartButton}>
                        <Buttonimg>
                        </Buttonimg>
                        </Styledbutton>
                        </div>
                        </Container>
                </BContainer>
        );
    }
​
​
    render() {
        const {isOnboardingPage} = this.state;
        return (
            <>
                {isOnboardingPage ? this.returnOnboardingPage() : <Main/>}
            </>
        );
    }
    
}
​
const Text_1 = styled.text`
position: absolute;
width: 220px;
height: 42px;
left: 78px;
top: 406px;
font-family: 'Spoqa Han Sans Neo', 'sans-serif';
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 21px;
text-align: center;
letter-spacing: -0.04em;
​
color: #817F8D;
`;
const Text_2 = styled.text`
position: absolute;
width: 180px;
height: 54px;
left: 104px;
top: 568px;
font-family: 'Spoqa Han Sans Neo', 'sans-serif';
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 21px;
text-align: center;
letter-spacing: -0.04em;
​
color: #E8E6F2;
​
`;
const BContainer = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: #E5E5E5;
`;
​
const Buttonimg = styled.div`
position: absolute;
width: 240px;
height: 18.6px;
left: -30px;
top: 409px;
background: url(https://i.imgur.com/9PJ1964.png);
background-size: cover;
z-index: 1;
`;
​
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
​
const Container = styled.div`
position: relative;
width: 375px;
height: 812px;
border: 2px solid black;
background: url(https://media.giphy.com/media/wSYE7n6pk9dqRXzitR/giphy.gif);
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
​
position: absolute;
width: 127px;
height: 127px;
left: 224px;
top: 159px;
border-radius: 50%;
background: rgba(222, 233, 255, 0.35);
`;
​
​
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
​
export default Onboarding;