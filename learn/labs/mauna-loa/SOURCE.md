# 마우나로아 CO₂ 실습 자료

자료 출처는 NOAA Global Monitoring Laboratory의 Xin Lan과 Scripps Institution of Oceanography의 Ralph Keeling입니다. [공식 데이터 페이지](https://gml.noaa.gov/ccgg/trends/data.html) · [연평균 원자료](https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_mlo.txt)

원자료에 표시된 2026년 10월 9일 생성본에서 1990–2019년 30개 연도와 세 열만 골라 실습용 CSV로 옮겼습니다. 열 이름을 `year`, `mean_ppm`, `uncertainty_ppm`으로 정하고 구분자를 쉼표로 바꿨습니다. 수치는 반올림하거나 보간하지 않았습니다. 관측소 자료는 품질 관리 과정에서 수정될 수 있습니다.

한 행은 한 연도이며 `mean_ppm`은 건조 공기 중 CO₂ 몰분율의 연평균입니다. `uncertainty_ppm`은 NOAA가 연평균에 대해 보고한 불확실성입니다. 원자료는 이 불확실성을 NOAA와 Scripps의 독립적인 연평균 추정 차이의 표준편차로 설명합니다.

## 실행

`analyze.py`, `annual_co2.csv`, `requirements.txt`를 같은 작업 폴더에 둡니다. Windows PowerShell에서 다음 명령을 사용합니다.

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe analyze.py
```

직접 의존 패키지의 버전을 고정했으며 Python 3.14.6에서 검증했습니다. 실행하면 현재 작업 폴더의 `co2_report/`에 요약표와 그림이 생성됩니다. 같은 폴더에서 다시 실행하면 두 결과 파일을 갱신합니다.
