import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import { faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons'
import './Header.css'


const Header = () => {
    const [fontSize, setFontSize] = useState(10);

    function increaseFontSize() {
        const newSize = fontSize + 1;
        setFontSize(newSize);
        document.documentElement.style.fontSize = newSize + "px";
    }
    function decreaseFontSize() {
        const newSize = fontSize - 1 > 2 ? fontSize - 1 : 2;
        setFontSize(newSize);
        document.documentElement.style.fontSize = newSize + "px";
    }
    function defaultFontSize() {
        setFontSize(10);
        document.documentElement.style.fontSize = 10 + "px";

    }
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
                    <div id='langcontent'>
                        <div><div>ਖੇਤੀ ਹੱਲ</div><div>KRISHI SOLUTIONS</div></div>
                        <div id='verticalruler'></div>
                        <div><div>ਸਮਾਰਟ ਖੇਤੀ ਲਈ ਡਿਜ਼ਿਟਲ ਪਲੇਟਫ਼ਾਰਮ</div><div>A DIGITAL PLATFORM FOR SMART FARMING</div></div>
                    </div>
                    <div id='textsize'>Text Size <button onClick={increaseFontSize}>A+</button><button onClick={decreaseFontSize}>A-</button><button onClick={defaultFontSize}>A</button></div>
                    {/* <div>Change Language : </div> */}
                </div>
                <div id='sticker'>
                    <div id="whiteboxsticker">
                        <div id="logosticker"></div>
                        <div id='verticalrulersticker'></div>
                        <div id='textsticker'>
                            <div id='head1textsticker'>Gursimranjeet Fasal Bima Yojana</div>
                            <div id='head2textsticker'>Farmer Welfare</div>
                        </div>
                        <div id="logandsign">
                            <button onClick={} id='sign'>Sign in</button>
                            <button onClick={} id='register'>Register</button>
                        </div>
                    </div>

                </div>

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
