const generateHtml = (data) => {
  console.log(data);
  const output = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Test results</title>
  </head>
  <body>${JSON.stringify(data)}</body>
</html>
  `;

  return output;
};

export default generateHtml;
