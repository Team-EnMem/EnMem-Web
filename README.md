# EnMem-Web
# S3(아마존 스토리지)에 이미지 업로드 후 라벨링 값 가져오는 법
> s3_image_upload 폴더에 있는 s3.html을 실행하면 create new album이 보임   
> create new album 클릭시 앨범명을 입력하는 창이 뜸   
> 앨범명 입력하면 S3에는 앨범명으로 된 폴더가 생성됨   
> 생성된 폴더안에 사진을 집어넣으려면 "파일 선택" 버튼을 클릭후 사진을 선택한 다음 "Add Photo" 버튼을 누르면 사진이 업로드 됨(참고로 jpg,png 확장자만 가능)   
> 사진이 성공적으로 업로드 되면<https://th5a2rg7k4.execute-api.ap-northeast-2.amazonaws.com/api/> 이곳에 접속하면 S3에 업로드 된 사진에 대한 라벨 데이터를 json으로 가져옴   
> 특정 사진에 대한 라벨 데이터만 가져오고 싶으면 링크 맨 끝에 업로드한 사진 이름을 붙이면 됨   
>    >예를 들어 <https://th5a2rg7k4.execute-api.ap-northeast-2.amazonaws.com/api/sample.jpg>     
>    >참고로 폴더안에 든 사진을 가져오기 위해선 폴더명/사진이름 하면 됨(현재 이 기능 작업중)   
