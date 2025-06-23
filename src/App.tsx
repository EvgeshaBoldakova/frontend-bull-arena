import './App.css'
import ArenaWithBull from './components/ArenaWithBull'
import { Matador } from './components/Matador/Matador'
// import { OldMatador } from './components/Matador/OldMatador'

function App() {
  return (
    <div className="App">
      <ArenaWithBull
        matador={<Matador />} />
        {/*matador={<OldMatador />} />*/}
    </div>
  )
}

export default App
