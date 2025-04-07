import { BuilderCanvas } from './components/builder-dnd/canvas';
import { DndKitProvider } from './components/builder-dnd/context';
import { BuilderElements } from './components/builder-dnd/elements';
import { Header } from './components/builder-dnd/header';
// import { ExampleDnd } from './components/dnd/example';

function App() {
  return (
    <div>
      <Header />
      <DndKitProvider>
        <div className="flex">
          <BuilderElements />
          <BuilderCanvas />
        </div>
      </DndKitProvider>
      {/* <ExampleDnd /> */}
    </div>
  );
}

export default App;
