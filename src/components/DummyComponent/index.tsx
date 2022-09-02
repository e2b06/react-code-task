import React from "react";

export const DummyComponent: React.FC<{ title: string }> = ({ title }) => {
  return (
    <>
      <div>
        <h1>this is {title} component</h1>
      </div>
    </>
  );
};
