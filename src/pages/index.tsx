import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Test from "../components/_Test";

const Content = () => {
  return (
    <>
      <Test title="Test Component" text="this is test" />
    </>
  );
};

const page = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Title</title>
</head>
<body>
${renderToStaticMarkup(<Content />)}
</body>
</html>
`;

export default page;
