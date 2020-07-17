const updateReportResults = ({ options, report, results }) => {
  const { ignore = [] } = options;
  const getFilenames = (ary) => ary
    .filter((rs) => !ignore.find((i) => rs.testFilePath.includes(i)))
    .map((i) => i.testFilePath.replace((/\\/g, '/')).split('/')[i.testFilePath.replace((/\\/g, '/')).split('/').length - 1]);

  const testResults = [
    ...new Set([...getFilenames(report.testResults), ...getFilenames(results.testResults)]),
  ].map((suite) => {
    // Updated test
    if (
      results.testResults.find((rs) => rs.testFilePath.endsWith(suite))
      && report.testResults.find((rs) => rs.testFilePath.endsWith(suite))
    ) {
      return {
        ...report.testResults.find((rs) => rs.testFilePath.endsWith(suite)),
        ...results.testResults.find((rs) => rs.testFilePath.endsWith(suite)),
        updated: Math.round(new Date().getTime()),
      };
    }

    // Existing test
    if (
      !results.testResults.find((rs) => rs.testFilePath.endsWith(suite))
      && report.testResults.find((rs) => rs.testFilePath.endsWith(suite))
    ) {
      return report.testResults.find((rs) => rs.testFilePath.endsWith(suite));
    }

    // New test
    return {
      ...results.testResults.find((rs) => rs.testFilePath.endsWith(suite)),
      created: Math.round(new Date().getTime()),
    };
  });

  return {
    ...report,
    startTime: report.startTime || results.startTime,
    testResults,
    updated: results.startTime,
  };
};

export default updateReportResults;
