import Settings from './components/Settings'
import Footer from './pages/Footer'
import Help from './pages/Help'
import Home from './pages/Home'
import Reservation from './pages/Reservation'
import TokenTest from './pages/TokenTest'

const App = () => {
  return (
    <>
      <header>
        <h1>Ticket reserver</h1>
        <Settings />
      </header>
      <main>
        <section id='topSection'>
          <Home />
          <Reservation />
        </section>
        <TokenTest />
        <Help />
      </main>
      <Footer />
    </>
  )
}

export default App
