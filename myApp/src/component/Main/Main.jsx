import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './Main.css'


const Main = () => {
    function handleOnClick() { }
    return (
        <>
            <Header />
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
                    <button onClick={handleOnClick} id='cardhbtn' className='cardh' style={{ backgroundImage: 'url(https://pmfby.amnex.co.in/pmfby/public/img/CIBack1.svg)' }}><img src="https://pmfby.amnex.co.in/pmfby/public/img/newHome/CIIcon1.svg" /><div className='cardhdiv1'>Farmer Corner</div><div className='cardhdiv2'>Apply for Crop Insurance Yourself</div></button>
                    <a className='cardf'>Farmer Crop</a>
                </div>
            </div>
            <div id='lnk'>
                <div className='lnkupperdiv'>
                    <div>
                        <div className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/farmer-app-icon.svg" /><div className='lnkcardhdiv1'>Gov Farmer App</div><a href='https://play.google.com/store/apps/details?id=in.farmguide.farmerapp.central&pcampaignid=web_share' className='lnkcardhdiv2'>Click For App Link</a></div>

                    </div>
                    <div>
                        <div className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/aide-scan-icon.svg" /><div className='lnkcardhdiv1'>AIDE App</div><a href='https://play.google.com/store/apps/details?id=com.application.pmfby.aide&pcampaignid=web_share' className='lnkcardhdiv2'>Click For App Link</a></div>

                    </div>
                    <div>
                        <div className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/clap-scan-icon.svg" /><div className='lnkcardhdiv1'>CLap App</div><a href='https://play.google.com/store/apps/details?id=com.application.pmfby.survey&pcampaignid=web_share' className='lnkcardhdiv2'>Click For App Link</a></div>

                    </div>
                    <div>
                        <div className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/winds-app-icon.svg" /><div className='lnkcardhdiv1'>WINDS App</div><a href='https://play.google.com/store/apps/details?id=com.application.winds&pcampaignid=web_share' className='lnkcardhdiv2'>Click For App Link</a></div>

                    </div>
                </div>
                <div className='lnkupperdiv'>
                    <div>
                        <a className='lnkcardh' ><img src="https://pmfby.amnex.co.in/pmfby/public/img/tutorial-icon-otherlinks.svg" /><div className='lnkcardhdiv1'>Tutorials</div></a>
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
                <a href='https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf'><FontAwesomeIcon icon={faAngleRight} /> 2023 Operational Guidelines of Pradhan Mantri Fasal Bima Yojna - (PMFBY)</a>
                <a href='https://pmfby.gov.in/compendium-files'><FontAwesomeIcon icon={faAngleRight} /> Studies</a>
                <a href='https://pmfby.gov.in/pdf/Revamped%20Operational%20Guidelines_17th%20August%202020.pdf'><FontAwesomeIcon icon={faAngleRight} /> REVAMPED OPERATIONAL GUIDELINES</a>
                <a href="/Crop_Calendar.pdf" download={true}><FontAwesomeIcon icon={faAngleRight} /> New Crop Calendar</a>
            </div>
            <Footer />
        </>
    );
};

export default Main;


