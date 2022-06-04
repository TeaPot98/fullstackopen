import { CoursePart } from "../types";

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <>
      {courses.map(part => {
        switch (part.type) {
          case 'normal':
            return (
              <>
              <p>
                <strong>{part.name} {part.exerciseCount}</strong><br/>
                {part.description && <em>{part.description}</em> }
              </p>
              </>
            );
          case 'groupProject':
            return (
              <>
              <p>
                <strong>{part.name} {part.exerciseCount}</strong><br/>
                project exercises {part.groupProjectCount}</p>
              </>
            );
          case 'submission':
            return (
              <>
              <p>
                <strong>{part.name} {part.exerciseCount}</strong><br/>
                {part.description && <><em>{part.description}</em><br/></> }
                submit to {part.exerciseSubmissionLink}
              </p>
              </>
            );
          default:
            break;
        }
      })}
    </>
  );
};

export default Content;