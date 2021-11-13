import React from "react";

import { CoursePart } from "../types";

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return <p>Number of exercises{" "}{total}</p>;
};

export default Total;
