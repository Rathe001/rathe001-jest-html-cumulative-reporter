import dateformat from 'dateformat';
import generateStyles from './generateStyles';

const getTestResult = ({
  created, failureMessages, fullName, historyDuration, status, updated,
}) => `
<li class="test-result ${status === 'passed' ? '' : 'failed'}">
  <span class="name">${fullName}</span>
  <div class="duration">
    ${historyDuration.map((h, i) => (`
      <div class="bar-wrap">
        <div
          class="bar ${h > historyDuration[i - 1] ? 'greater' : 'less'}"
          style="height: ${(Number(h) / Math.max(...historyDuration)) * 100}%;"
          title="${(h / 1000).toFixed(2)} seconds"
        ></div>
      </div>
    `)).join('')}
    <span class="time">${(historyDuration[historyDuration.length - 1] / 1000).toFixed(2)}s</span>
  </div>
  <div class="updated">Last run: ${dateformat(updated || created, 'mm-dd-yyyy, h:MM:ss TT')}</div>
  ${failureMessages.length ? `<pre>${failureMessages.map((msg) => msg)}</pre>` : ''}
</li>`;

const getSuite = (suite) => {
  const normalizedPath = suite.testFilePath.replace((/\\/g, '/')).split('/');
  const name = suite.testResults[0].ancestorTitles[0];
  const file = [normalizedPath[normalizedPath.length - 2], normalizedPath[normalizedPath.length - 1]].join('/');

  return `<div class="suite">
    <h3 class="${suite.numFailingTests > 0 ? 'failed' : 'passed'}">${name}<br /><small class="file">${file}</small> <span class="summary">${suite.numPassingTests} passed, ${suite.numFailingTests} failed</span></h3>
    <ol class="test-results">
      ${suite.testResults.map((testResult) => getTestResult(testResult)).join('')}
    </ol>
  </div>`;
};

const generateHtml = (data, { title }) => {
  const output = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Test results</title>
    ${generateStyles()}
  </head>
  <body>
    <div class="wrap">
      <h1>${title}</h1>
      <h2>Summary</h2>
      <div class="row">
        <div class="label">Start time:</div>
        <div class="value">${dateformat(data.startTime, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</div>
      </div>
      <div class="row">
        <div class="label">Last update:</div>
        <div class="value">${dateformat(data.updated, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</div>
      </div>
      <div class="row">
        <div class="label">Total passed:</div>
        <div class="value">${data.numPassedTestSuites} suites, ${data.numPassedTests} tests</div>
      </div>
      <div class="row">
        <div class="label">Total failed:</div>
        <div class="value">${data.numFailedTestSuites} suites, ${data.numFailedTests} tests</div>
      </div>
      <h2>Suite Results</h2>
      <div class="suites">
        ${data.testResults.map((suite) => getSuite(suite)).join('')}
      </div>
    </div>

    <script>
      {
        const suites = document.querySelectorAll('.suite');
        [...suites].forEach((suite) => suite
          .querySelector('h3')
          .addEventListener('click', () => suite.classList.toggle('active')));
      }
    </script>
  </body>
</html>
  `;

  return output;
};

export default generateHtml;
