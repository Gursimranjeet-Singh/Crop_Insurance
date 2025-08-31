import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import { faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons'
import './Header.css'


const Header = () => {
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
                <div id='lang'>
                    <div>logo</div>
                    <div>Text Size <button>A-</button><button>A</button><button>A+</button></div>
                    <div>Change Language : </div>
                </div>
                <div id='sticker'>sticker</div>
                <div id='navbar'>
                    <div><a>Home</a></div>
                    <div><a>Related Links</a></div>
                    <div><a>Reports</a></div>
                    <div><a>Contact Us</a></div>
                 
                </div>
            </header>
        </>
    );
};

export default Header;
