# EnMem-Web

EnMem은 앱 사용자가 사진을 선택하면 그 사진 및 영상을 분석 후 그에 맞는 음악을 추천해주는 서비스입니다.

서비스에 대한 자세한 아키텍쳐와 설명은 다음 유튜브 링크에서 확인하실 수 있습니다.

[![추억 증폭기"엔멤"](https://img.youtube.com/vi/L_te34S3Zec/0.jpg)](https://youtu.be/L_te34S3Zec)

## 매칭 알고리즘

* 이미지와 영상을 AWS Rekognition을 통해 객체 탐지
* 사람이 존재하는 이미지인 경우 Azure Face API를 통해 감정 추출
* 위 과정을 통해 얻은 정보를 바탕으로 Youtube의 검색 알고리즘을 통해 음악 매칭

## 체험 링크

본 서비스는 Azure App Service에서 이루어지고 있습니다. 처음 접속시에는 30초 정도 응답하는데 걸릴 수 있으며 향후 서비스가 종료될 수 도 있습니다.

https://enmem.azurewebsites.net
