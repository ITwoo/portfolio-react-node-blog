Back-End Server : Node.js (Express.js)

Front-end Server: React (Hook)

Make Project : Blog 

배포 서버 : https://font-techblog.herokuapp.com/list

heroku 특성상 일정 시간 미 접속시 서버가 자동으로 꺼지기때문에 초기 서버 켜지는 시간이 길어 초기 접속시 시간이 오래걸릴수 있습니다. (20 -30s)

front-end back-end 서버가 따로 있기 때문에 초기 접속후 데이터 가져오는 시간이 걸릴 수 있습니다. 

서버가 켜진 후 접속하면 빠른 시간에 로딩이 됩니다. (5초이내)

이미지는 cloudinary를 이용하고 있습니다.

back-end 는 api 형식으로 구현 React서버와 nodejs서버를 각각 한대씩 두대로 운영 중

---------------------2021 10 08-----------------------------

Heroku 배포 시작 - clearDB사용

---------------------2021 10 09-----------------------------

이미지 깨짐현상 발견

Cloudinary를 사용해 해결

---------------------2021 10 14 ----------------------------

back-end server restfull api 적용

글 쓰기관련 로그인 확인부분 에러발견 후 useEffect를 나눠 해결