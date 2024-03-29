/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewDiaryEntry, Visibility, Weather } from "./types";

type Fields = { comment: unknown, date: unknown, weather: unknown, visibility: unknown };

const isString = (text: unknown): text is string => {
  return typeof (text) === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment.');
  }

  return comment;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date.');
  }

  return date;
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather.');
  }

  return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility.');
  }

  return visibility;
};

const toNewDiaryEntry = ({ comment, date, weather, visibility }: Fields): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(comment),
    date: parseDate(date),
    weather: parseWeather(weather),
    visibility: parseVisibility(visibility),
  };

  return newEntry;
};

export default toNewDiaryEntry;
