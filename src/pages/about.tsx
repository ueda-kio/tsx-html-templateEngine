import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const Content = () => {
  return (
    <>
      <h1>this is about page.</h1>
    </>
  );
};

const page = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>About</title>
</head>
<body>
${renderToStaticMarkup(<Content />)}
</body>
</html>
`;

export default page;
