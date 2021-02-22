import logo from './logo.svg';
import './App.css';
import Form from "./components/FormElements/Form";
import {VideoComp} from "./components/VideoComp";

function App() {
    const formInfo = {
        formElements: [
            {
                elementType: 'select',
                label: 'Label1',
                id: '1',
                options: ['option1', 'option2']
            },
            {
                elementType: 'input',
                label: 'Label2',
                id: '2',
                textType: 'Password'
            }
        ]
    };
    return (
    <div className="App">
      <header className="App-header">
          <VideoComp/>
          <Form formInfo={formInfo}/>
      </header>
    </div>
  );
}

export default App;
