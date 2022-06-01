import { NewDiaryEntry, Visibility, Weather } from './types';

// type Fields = { comment: unknown, date: unknown, weather: unknown, visibility: unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(object.comment),
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
  };

  return newEntry;
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error ('Incorrect or missing comment');
  }
  return comment;
};

// This functions is so-called "type guard". That means it is a function which returns a boolean and which has a "type predicate" as the return type. In our case, the type predicate is "text is string". The general form of a type predicate is "parameterName is Type" where "parameterName" is the name of the function parameter and "Type" is the targeted type. This particular function checks if the parameter "text" passed to the functions is of type "string".
const isString = (text: unknown): text is string => {
  // Why are using two conditions ? Because it depends on how the string was created (see the examples below):
// const a = "I'm a string primitive";
// const b = new String("I'm a String Object");
// typeof a; --> returns 'string'
// typeof b; --> returns 'object'
// a instanceof String; --> returns false
// b instanceof String; --> returns true
  return typeof text === 'string' || text instanceof String;
};

// A functions that check if "date" is of a correct JS date format
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date:' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWeather = (param: any): param is Weather => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Weather).includes(param);
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather:' + weather);
  }
  return weather;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVisibility = (param: any): param is Visibility => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error ('Incorrect or missing visibility:'+ visibility);
  }
  return visibility;
};

export default toNewDiaryEntry;