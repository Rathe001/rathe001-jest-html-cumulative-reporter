const updateReportProperties = ({ report }) => ({
  ...report,
  numFailedTestSuites: report.testResults.filter((suite) => suite.numFailingTests > 0).length,
  numFailedTests: report.testResults.reduce((total, item) => total + item.numFailingTests, 0),
  numPassedTestSuites: report.testResults.filter((suite) => suite.numPassingTests > 0).length,
  numPassedTests: report.testResults.reduce((total, item) => total + item.numPassingTests, 0),
  numPendingTestSuites: report.testResults.filter((suite) => suite.numPendingTests > 0).length,
  numPendingTests: report.testResults.reduce((total, item) => total + item.numPendingTests, 0),
  numTodoTests: report.testResults.reduce((total, item) => total + item.numTodoTests, 0),
  numTotalTestSuites: report.testResults.filter((suite) => suite.numTodoTests > 0).length,
  numTotalTests: report.testResults.reduce(
    (total, item) => total + item.numFailingTests + item.numPassingTests,
    0,
  ),
});

export default updateReportProperties;
