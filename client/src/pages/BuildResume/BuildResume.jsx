import React, { useState } from 'react'
import './BuildResume.css'
import Personal from '../../components/Forms/Personal/Personal';
import Education from '../../components/Forms/Education/Education';
import Experience from '../../components/Forms/Experience/Experience';
import Skills from '../../components/Forms/Skills/Skills';
import Projects from '../../components/Forms/Projects/Projects';
import Achievements from '../../components/Forms/Achievements/Achievements';
import HiddenResume from '../../components/Templates/HiddenResume'
import { connect } from 'react-redux';
import { fetchData, postData, updateData } from '../../redux/actionControllers';
import {jsPDF} from 'jspdf'
import Templates from '../../components/Forms/Templates/Templates';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faDownload, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';


const BuildResume = (props) => {
    // const history = useHistory();

    const navigate= useNavigate();
    const {enqueueSnackbar}=useSnackbar();
    const [activeStep, setActiveStep] = useState(0);

    const token = props.token;

    const steps = ['Personal', 'Educational', 'Experience', 'Projects', 'Skills', 'Achievements', 'Template'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Personal />;
            case 1:
                return <Education resume={props.resume} />;
            case 2:
                return <Experience resume={props.resume} />;
            case 3:
                return <Projects resume={props.resume} />;
            case 4:
                return <Skills resume={props.resume} />;
            case 5:
                return <Achievements resume={props.resume} />;
            case 6:
                return <Templates resume={props.resume} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleClick = (idx) => {
        setActiveStep(idx);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const generatePdf = () => {
        var img = new Image();
        img.src = props.image;
        var preview = document.getElementById('preview');
        var width = preview.clientWidth;
        var height = preview.clientHeight;

        if (props.image) {

            const pdf = new jsPDF({
                orientation: (height > width) ? "portrait" : "landscape",
                unit: "pt",
                format: [height, width]//[height, width]//[img.height * (0.5625), img.width * (0.5625)]
            });
            pdf.addImage(img, 'PNG', 0, 0, width, height, 'SLOW');
            pdf.save("resume.pdf");
            enqueueSnackbar('Downloaded! Cast your Resume PDF. All the Best! ', { variant: 'success' });
        }
    };

    const clickSave = (event) => {
        if (event)
            event.preventDefault();

        if (props.resume._id) {
            props.updateData(token, props.resume);
        }
        else if (token) {
            props.postData(token, props.resume)
        }
        else {
            navigate("/signup");
        }
    }

  return (
    <>
     <div className='build-resume'>
        <button onClick={generatePdf} disabled={(props.image)? '' : true} >Download PDF <FontAwesomeIcon icon={faDownload}/></button>
        <div className="stepper">
            {
                steps.map((label, index) => {
                    <div key={label} className="steps-container">
                        <ul className="steplabel">
                            <li key={label} onClick={()=> handleClick(index)}>{label}list1</li>
                            <li key={label}>{label}list2</li>
                        </ul>
                    </div>
                })
            }
        </div>
        <div className="main">
            <div className="paper">
                <>
                <>
                { getStepContent(activeStep)}
                <div className="buttons">
                    <button 
                    onClick={handleBack}
                    disabled={(activeStep === 0)? true : ''}
                    >Back <FontAwesomeIcon icon={faArrowAltCircleLeft}/></button>
                    {activeStep === steps.length - 1 
                    ? <button onClick={clickSave}>Generate <FontAwesomeIcon icon={faMagicWandSparkles}/></button>
                    : <button onClick={handleNext}>Next<FontAwesomeIcon icon={faArrowAltCircleRight}/></button>
                }
                </div>
                </>
                </>
            </div>
        </div>
        <div className="preview">
            {(props.image)? <img id='preview' alt='preview' src={props.image} /> : '' }
        </div>

    </div>
    {(props.resume.template)
    ? <HiddenResume id={'pdf'} />
     : <div id={'pdf'}></div>}
    </>
  )
}

const mapStateToProps = state => {
    return {
        resume: state.resume.data,
        token: state.resume.token,
        image: state.resume.image
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: (props, callback) => { dispatch(fetchData(props, callback)) },
    postData: (token, resume) => { dispatch(postData(token, resume)) },
    updateData: (token, resume) => { dispatch(updateData(token, resume)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildResume);