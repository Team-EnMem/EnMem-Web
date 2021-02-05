import React from 'react';
import Main from './Main';

class Onboarding extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isOnboardingPage: true,
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(preProps, prevState) {

    }

    componentWillUnmount() {

    }

    onClickStartButton = () => {
        this.showHomePage()
    }

    showHomePage = () => {
        this.setState({
            isOnboardingPage: false
        });
    }

    returnOnboardingPage = () => {
        return (
            <>
                <h1> 시작 페이지 </h1>
                <input type="button" value="엔멤 체험하기" onClick={this.onClickStartButton}/>
            </>
        );
    }

    render() {
        const {isOnboardingPage} = this.state;
        return (
            <>
                {isOnboardingPage ? this.returnOnboardingPage() : <Main/>}
            </>
        );
    }
}

export default Onboarding;