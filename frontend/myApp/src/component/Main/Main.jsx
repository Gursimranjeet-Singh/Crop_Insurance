import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import './Main.css'


const Main = () => {
    return (
        <>
            <div id='carddiv'>
                <div>
                    <div className='cardh' style={{backgroundImage:'url(https://pmfby.amnex.co.in/pmfby/public/img/CIBack7.svg)'}}><img src="https://pmfby.amnex.co.in/pmfby/public/img/newHome/CropicLogo.svg"/><div>Collection of real time Observation</div><div>Crop health monitoring</div></div>
                    <div className='cardf'>Crop Photograph</div>
                </div>
            </div>
            <div id='lnk'>

            </div>
            <div id='hyplnk'>
               <h2>What's New ?</h2>
               <a href=''><FontAwesomeIcon icon={faAngleRight} /> 2023 Operational Guidelines of Pradhan Mantri Fasal Bima Yojna - (PMFBY)</a>
               <a href=''><FontAwesomeIcon icon={faAngleRight} /> Studies</a>
               <a href=''><FontAwesomeIcon icon={faAngleRight} /> REVAMPED OPERATIONAL GUIDELINES</a>
               <a href=''><FontAwesomeIcon icon={faAngleRight} /> New Crop Calendar</a>
            </div>
        </>
    );
};

export default Main;


