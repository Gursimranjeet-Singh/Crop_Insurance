import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import { faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons'
import './App.css'

function App() {
  return (
    <>
      <header id="head1">
        <div className="head11c">
          <div id='head111'><FontAwesomeIcon icon={faSquareWhatsapp} id="head111font" /></div>
          <div className="head12c">
            Krishi Rakshak Portal helpline - <span className="head11span">7065514447</span>
          </div>
        </div>

        <div className="head11c">
          <FontAwesomeIcon icon={faHeadset} id="head12font" />
          <div className="head12c">
            Krishi Rakshak Portal helpline - <span className="head11span">14447</span>
          </div>
        </div>
      </header>
      <header id="head2">
        <div id='lang'>logo+text+laguage</div>
        <div id='sticker'>sticker</div>
        <div id='navbar'>navbar</div>
      </header>
      <div id='carddiv'>
      
      </div>
      <div id='lnk'>

      </div>
      <div id='hyplnk'></div>

      <footer id='foot'>
        <div id='footnav'>
        </div>
        <div id='joinpcopy'>
          <div id='join'></div>
          <div id='copy'></div>
        </div>
      </footer>
    </>
  )
}5.08

export default App
