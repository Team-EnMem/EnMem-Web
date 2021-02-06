import React from 'react';
import styled from 'styled-components';

// Style the Button component
const Button = styled.button`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 16px 40px;

position: absolute;
width: 161px;
height: 53px;
left: 107px;
top: 608px;
background: rgba(255, 255, 255, 0.6);
box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.08);
border-radius: 40px;
border-style: solid;
border-color: rgba(255, 255, 255, 0.1);
`;

const Text_1 = styled.text`
position: absolute;
width: 170px;
height: 21px;
left: -6px;
top: 14px;

font-family: 'Spoqa Han Sans Neo', 'sans-serif';
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 21px;
text-align: center;

color: #373445;

order: 0;
`;

const ReUploader = props => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

    console.log(props.handleChangeFile)

  return (
    <>
      <Button onClick={handleClick}>
        <Text_1>
        다시 업로드
        </Text_1>
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={props.handleChangeFile}
        style={{display: 'none'}}
      />
    </>
  );
}

export default ReUploader;