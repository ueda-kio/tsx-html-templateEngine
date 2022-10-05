import React from "react";

type Props = {
  title: string;
  text: string;
};

const Test: React.FC<Props> = ({ title, text }) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{text}</p>
    </>
  );
};

export default Test;
