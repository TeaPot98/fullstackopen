import ReactDOM from 'react-dom';

interface WelcomeProps {
  name: string;
}

const Welcome = (props: WelcomeProps) => {
  return <h1>Hellor, {props.name}</h1>;
};

const element = <Welcome name="Sara" />
ReactDOM.render(element, document.getElementById("root"));
