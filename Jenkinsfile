pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.52.0-noble' } }
   stages {
      stage('e2e-tests') {
         steps {
            sh 'npm ci'
            sh 'npx playwright test --workers 10'
         }
      }
   }
   post{
       always{
           publishHTML([
                          reportName: 'Playwright Report',
                          reportDir: 'playwright-report',
                          reportFiles: 'index.html',
                          keepAll:    true,
                          alwaysLinkToLastBuild: true,
                          allowMissing: false
                        ])
             }
     }
}