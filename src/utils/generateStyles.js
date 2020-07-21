const generateStyles = () => `
<style>
  body {
    font-family: arial, sans-serif;
    font-size: 12px;
  }
  pre {
    white-space: break-spaces;
    font-size: 10px;
    padding: 5px 15px;
    border-left: 5px solid red;
    margin: 10px;
    background: black;
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
    float: right;
    height: 25px;
  }
  .history {
    color: ##c1c1c1;
  }
  .updated {
    display: block;
    color: #c1c1c1;
    font-size: 11px;
    margin-left: 15px;
  }
  .bar-wrap {
    float: left;
    width: 7px;
    height: 100%;
    position: relative;
    margin-right: 1px;
  }
  .bar {
    width: 100%;
    position: absolute;
   
    bottom: 0;
    left: 0;
  }
    .bar.greater {
      background: #ffc107;
    }
    .bar.less {
      background: #00DFEB;
    }
  .time {
    float: right;
    font-size: 12px;
    margin: 13px 0 0 0;
    width: 50px;
    text-align: right;
  }
</style>
  `;

export default generateStyles;
