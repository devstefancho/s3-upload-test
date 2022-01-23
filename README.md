## Proclaim

해당 코드가 정상 동작하기 위해서는 s3와 IAM 설정이 필요합니다.
[블로그](https://velog.io/@devstefancho/s3-frontend%EC%97%90%EC%84%9C-s3-bucket%EC%97%90-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%B0%94%EB%A1%9C-%EC%98%AC%EB%A6%AC%EA%B8%B0)를 참고해주세요

---

## 시작하기

### 1) .env 추가하기

```
touch .env # .env파일을 생성합니다.
```

.env파일에는 IAM 설정시에 발급받은 두개의 key가 필요합니다.

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

### 2) node 서버를 시작합니다.

```
cd back
node server.js
```
