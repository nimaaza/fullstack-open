import React from "react";

import { CoursePart } from "../types";

import Part from "./Part";

const Contents = ({ courseParts }: {courseParts: CoursePart[]}) => {
  return (
    <div>
      {courseParts.map(part => <Part key={part.name} part={part} /> )}
    </div>
  );
};

export default Contents;
