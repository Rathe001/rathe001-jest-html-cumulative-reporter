import fs from 'fs';
import { updateReportResults, updateReportProperties } from 'jest-json-cumulative-reporter/utils';
import generateHtml from './utils';

class JestHtmlCumulativeReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = {
      filename: 'report.html',
      ignore: [],
      ...options,
    };
    this.report = fs.existsSync(options.filename)
      ? JSON.parse(fs.readFileSync(options.filename, 'utf8'))
      : { testResults: [] };
  }

  onRunComplete(test, results) {
    this.report = updateReportResults({
      options: this.options,
      report: this.report,
      results,
    });
    this.report = updateReportProperties({
      report: this.report,
    });
    const htmlReport = generateHtml(this.report);
    fs.writeFileSync(this.options.filename, htmlReport);
  }
}

export default JestHtmlCumulativeReporter;
