import { BuilderCanvas } from './builder/canvas';
import { BuilderElements } from './builder/elements';
import { Header } from './builder/header';

function App() {
  return (
    <div>
      <Header />
      <div className="flex">
        <BuilderElements />
        <BuilderCanvas />
      </div>
    </div>
  );
}

export default App;
