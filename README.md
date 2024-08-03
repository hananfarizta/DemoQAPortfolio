# MUHAMMAD HANAN RAFIF FARIZTA - FLIP TAKE HOME TEST CHAPTER 2

## **Prerequisites**

Before you continue, ensure you meet the following requirements:

- Visual Code: https://code.visualstudio.com/
- Version nodejs: 22.5.1
- Version Cypress: 13.13.2
- Install dependency at current working directory: `npm install`

## **How to Run**

Install dependency at current working directory

```
npm install
```

Run Cypress

```
npx cypress open
```

Run All Test

```
npx cypress run --spec 'cypress/e2e/features/**/*.feature'
```

## **How to Uplod the Tests to TestRail using TR CLI**

Run Test

```
npx cypress run --reporter "junit" --reporter-options "mochaFile=reports/junit-[hash].xml"
```

Instal TR CLI

```
pip install trcli
```

Instal JUnit Parser

```
pip install junitparser
```

Merge Reports

```
junitparser merge --glob "reports/junit-*" "reports/junit-report.xml"
```

Upload Results

```
trcli -y -c "trcli-config.yml" parse_junit -f "./reports/junit-report.xml"
```
