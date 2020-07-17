const generateStyles = () => `
<style>
  body {
    font-family: arial, sans-serif;
    font-size: 12px;
  }
  pre {
    white-space: normal;
    font-size: 10px;
    padding: 5px 15px;
    border-left: 5px solid red;
    margin: 10px;
  }
  h3 {
    padding: 5px 10px;
    background: #f1f1f1;
    font-size: 14px;
    font-weight: normal;
    border-radius: 3px;
    margin: 0;
    cursor: pointer;
  }
  .wrap {
    max-width: 1280px;
    margin: 0 auto 100px auto;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
    .row.alt {
      background: #f1f1f1;
    }
  .label {
    font-weight: 700;
  }
  .value {
    padding: 0 0 0 5px;
  }
  .file {
    color: #777;
  }
  .suites {}
  .suite {
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0;
    margin: 0 0 10px;
  }
    .suite ol {
      display: none;
    }
    .suite.active ol {
      display: block;
    }
  .test-results {
    list-style-position: inside;
    margin: 0;
    padding: 0;
  }
  .test-result {
    font-size: 13px;
    margin: 0;
    padding: 5px;
    border-bottom: 1px solid #f1f1f1;
  }
  .test-result:hover {
    background: #f1f1f1;
  }
  .summary {
    float: right;
  }
  .passed {
    color: green;
  }
  .failed {
    color: red;
  }
  .duration {
    color: #777;
    float: right;
  }
</style>
  `;

export default generateStyles;
