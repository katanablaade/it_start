import AppHeader from '../AppHeader/AppHeader';
import Seminars from '../Seminars/Seminars';
import './App.css';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Seminars />
      </main>
    </div>
  );
}

export default App;
