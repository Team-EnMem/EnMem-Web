import React from 'react';
import styled from 'styled-components';

// Style the Button component
const Button = styled.button`
position: absolute;
width: 180px;
height: 180px;
left: 97px;
top: 186px;
background: rgba(255, 255, 255, 0.5);
box-shadow: 0px 0px 30px rgba(248, 118, 91, 0.2);
font-family: 'Spoqa Han Sans Neo', 'sans-serif';
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 21px;
border-radius: 50%;
border-style: solid;
border-color: rgba(255,255,255,0.01);
`;


const FileUploader = props => {
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

  return (
    <>
      <Button onClick={handleClick}>
        Upload a file
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

export default FileUploader;