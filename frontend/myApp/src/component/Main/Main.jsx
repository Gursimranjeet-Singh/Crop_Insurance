import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import './Main.css'


const Main = () => {
    return (
        <>
            <div id='carddiv'>
                <div>
                    <a href='https://pmfby.gov.in/winds/' className='cardh' style={{ backgroundImage: 'url(https://pmfby.amnex.co.in/pmfby/public/img/CIBack6.svg)' }}><img src="https://pmfby.amnex.co.in/pmfby/public/img/newHome/CIIcon7.svg" /><div className='cardhdiv1'>Weather Information Network & Data System</div><div className='cardhdiv2'>Know your Area's Weather Updates</div></a>
                    <a href='https://pmfby.gov.in/winds/' className='cardf'>Weather Data</a>
                </div>
                <div>
                    <a href='https://pmfby.gov.in/cropic/' className='cardh' style={{ backgroundImage: 'url(https://pmfby.amnex.co.in/pmfby/public/img/CIBack7.svg)' }}><img src="https://pmfby.amnex.co.in/pmfby/public/img/newHome/CropicLogo.svg" /><div className='cardhdiv1'>Collection of Real-time Observations and Photographs of Crops</div><div className='cardhdiv2'>Crop Health Monitoring & Crop Loss Assessment</div></a>
                    <a href='https://pmfby.gov.in/cropic/' className='cardf'>Crop Photographs</a>
                </div>
                <div>
                    <a href='https://pmfby.gov.in/krph/' className='cardh' style={{ backgroundImage: 'url(https://pmfby.amnex.co.in/pmfby/public/img/CIBack5.svg)' }}><img src="https://pmfby.amnex.co.in/pmfby/public/img/newHome/KRPH_Logo.svg" /><div className='cardhdiv1'>Krishi Rakshak Portal & Helpline</div><div className='cardhdiv2'>Tell us about your Grievances & Report loss of Crop</div></a>
                    <a href='https://pmfby.gov.in/krph/' className='cardf'>Krishi Rakshak</a>
                </div>
                <div>
                    <button className='cardh' style={{ backgroundImage: 'url(https://pmfby.amnex.co.in/pmfby/public/img/CIBack1.svg)' }}><img src="https://pmfby.amnex.co.in/pmfby/public/img/newHome/CIIcon1.svg" /><div className='cardhdiv1'>Farmer Corner</div><div className='cardhdiv2'>Apply for Crop Insurance Yourself</div></button>
                    <a className='cardf'>Farmer Crop</a>
                </div>
            </div>
            <div id='lnk'>
                <div className='lnkupperdiv'>
                    <div>
                        <div className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/farmer-app-icon.svg" /><div className='lnkcardhdiv1'>Gov Farmer App</div><a className='lnkcardhdiv2'>Click To Scan App</a></div>

                    </div>
                    <div>
                        <div className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/aide-scan-icon.svg" /><div className='lnkcardhdiv1'>AIDE App</div><a className='lnkcardhdiv2'>Click To Scan App</a></div>

                    </div>
                    <div>
                        <div className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/clap-scan-icon.svg" /><div className='lnkcardhdiv1'>CLap App</div><a className='lnkcardhdiv2'>Click To Scan App</a></div>

                    </div>
                    <div>
                        <div className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/winds-app-icon.svg" /><div className='lnkcardhdiv1'>WINDS App</div><a className='lnkcardhdiv2'>Click To Scan App</a></div>

                    </div>
                </div>
                <div className='lnkupperdiv'>
                    <div>
                        <addEventListener className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/tutorial-icon-otherlinks.svg" /><div className='lnkcardhdiv1'>Tutorials</div></a>
                    </div>
                    <div>
                        <a className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/circular-icon-otherlinks.svg" /><div className='lnkcardhdiv1'>Circulars</div></a>
         
                    </div>
                    <div>
                        <a className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/broker-directory-icon-otherlinks.svg" /><div className='lnkcardhdiv1'>Insurance Company Directory</div></a>
         
                    </div>
                    <div>
                        <a className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/bank-directory-otherlinks.svg" /><div className='lnkcardhdiv1'>Currency Directory</div></a>
         
                    </div>
                </div>

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


