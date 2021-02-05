import React from 'react';

class Loading extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <>
                <h1 style={{color: "red"}}> 로딩 페이지 </h1>
            </>
        );
    }
}

export default Loading;