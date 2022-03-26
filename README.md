# kml_backend
지니어스 마작 동아리 backend입니다.

# INSTALLATION

```
git clone https://github.com/asdfghjkkl11/kml_backend.git
cd kml_backend
npm install
node start
```

# API

### GET

1. 순위검색 ( /ranking )

    종합기록, 다승, 국수, 승률, 승점률, 1,2위률, 4위률 확인

2. 기록 ( /record_list )

    등록한 기록들 확인
    
3. 개인성적 ( /record_per )

    동장기록, 남장기록, 월간, 주간, 요일별, 시간별 성적확인
       
4. 상대성적 ( /record_versus_res )

    동장기록, 남장기록 성적확인

5. 사용자목록 ( /player )

    동장기록, 남장기록, 월간, 주간, 요일별, 시간별 성적확인
    
### POST

1. 기록입력 ( /record_ok )

    기록입력

2. 기록수정 ( /record_modify_ok )

    기록수정

3. 기록삭제 ( /record_del )

    기록삭제

4. 기록복구 ( /record_res )

    기록복구

5. 사용자등록 ( /registid_ok )

    사용자등록
    
