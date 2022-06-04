// We could use "type" instead of "interface". There will be the same effect. But if we define two interfaces with the same name, they will be merged. With two types with the same name we will get an error.

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  description?: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  description?: string;
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase {
  type: "special";
  description?: string;
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;