const updateReportResults = ({ options, report, results }) => {
  const { ignore = [] } = options;
  const getFilenames = (ary) => ary
    .filter((rs) => !ignore.find((i) => rs.testFilePath.includes(i)))
    .map((i) => i.testFilePath.replace((/\\/g, '/')).split('/')[i.testFilePath.replace((/\\/g, '/')).split('/').length - 1]);

  const mergeTests = (existingTest, newTest) => {
    const mergedTest = { ...existingTest, ...newTest };

    if (existingTest && newTest) {
      mergedTest.historyDuration.unshift(existingTest.duration);
      mergedTest.historyDuration = mergedTest.historyDuration.slice(0, 10);
      mergedTest.updated = new Date().getTime();
    } else if (!existingTest && newTest) {
      mergedTest.historyDuration = [];
      mergedTest.created = new Date().getTime();
    }

    return mergedTest;
  };

  const mergeSuites = (existingSuite = {}, newSuite = {}) => {
    const mergedSuite = { ...existingSuite, ...newSuite };

    if (existingSuite.testResults && newSuite.testResults) {
      mergedSuite.updated = new Date().getTime();
      const uniqueSuiteTestResults = [
        ...new Set([
          ...existingSuite.testResults.map((rs) => rs.fullName),
          ...newSuite.testResults.map((rs) => rs.fullName),
        ]),
      ];
      mergedSuite.testResults = uniqueSuiteTestResults.map((uniqueResult) => {
        const existingTest = existingSuite.testResults.find((rs) => rs.fullName === uniqueResult);
        const newTest = newSuite.testResults.find((rs) => rs.fullName === uniqueResult);

        return mergeTests(existingTest, newTest);
      });
    } else if (!existingSuite.testResults && newSuite.testResults) {
      mergedSuite.testResults = mergedSuite.testResults.map((test) => mergeTests(undefined, test));
      mergedSuite.created = new Date().getTime();
    }

    return mergedSuite;
  };

  const uniqueFiles = [
    ...new Set([...getFilenames(report.testResults), ...getFilenames(results.testResults)]),
  ];

  const testResults = uniqueFiles.map((file) => {
    const existingSuite = report.testResults.find((rs) => rs.testFilePath.endsWith(file));
    const newSuite = results.testResults.find((rs) => rs.testFilePath.endsWith(file));

    return mergeSuites(existingSuite, newSuite);
  });

  return {
    ...report,
    startTime: report.startTime || results.startTime,
    testResults,
    updated: results.startTime,
  };
};

export default updateReportResults;
