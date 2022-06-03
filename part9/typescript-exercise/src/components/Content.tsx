import { CoursePart } from "../types";

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <>
      {courses.map(c => 
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>  
      )}
    </>
  );
};

export default Content;