import React from "react";

import { CoursePart } from "../types";

const Contents = ({ courseParts }: {courseParts: CoursePart[]}) => {
  return (
    <div>
      {courseParts.map(c => {
        return <p key={c.name}>{c.name} {c.exerciseCount}</p>;
      })}
    </div>
  );
};

export default Contents;
