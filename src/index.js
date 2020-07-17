import fs from 'fs';
import { updateReportResults, updateReportProperties, generateHtml } from './utils';

class JestHtmlCumulativeReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = {
      filename: 'report',
      ignore: [],
      title: 'Bottomline Automation',
      ...options,
    };
    this.report = fs.existsSync(`${options.filename}.json`)
      ? JSON.parse(fs.readFileSync(`${options.filename}.json`, 'utf8'))
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
    const htmlReport = generateHtml(this.report, this.options);
    fs.writeFileSync(`${this.options.filename}.json`, JSON.stringify(this.report));
    fs.writeFileSync(`${this.options.filename}.html`, htmlReport);
  }
}

export default JestHtmlCumulativeReporter;
