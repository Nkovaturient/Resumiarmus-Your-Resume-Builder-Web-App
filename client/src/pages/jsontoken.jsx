import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
// import { Buffer } from 'buffer';
import axios from 'axios';
import { config } from '../config/config';
import Template1 from '../components/Templates/Template1/Template1';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Template2 from '../components/Templates/Template2/Template2';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const JwtTestComponent = (props) => {
  const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    
    try{
      const secretKey = 'your-256-bit-secret';
        const payload = {
          userId: 123,
          username: 'testuser',
        };
    
        const options = {
          expiresIn: '1h',
        };
    
        const token = jwt.sign(payload, secretKey, options);
        console.log('Generated Token:', token);
    
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            console.error('Token verification failed:', err);
          } else {
            console.log('Decoded Token:', decoded);
          }
        });
    
        const decoded = jwt.decode(token);
        console.log('Decoded Token (without verification):', decoded);
   

    }catch(error){
      if (error) {
        console.error('Error generating or verifying token:', error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    
    }
   
  
    const generatePdf=()=>{
      const img=new Image();
      img.src=props.image;
      let preview=document.getElementById('preview');
        let width = preview.clientWidth;
        let height = preview.clientHeight;
        var activeFontSize =  16;

        const setDisplayMode=(zoom, layout, pmode)=>{
          setZoomMode(zoom)
          setLayoutMode(layout)
          setPageMode(pmode)

        }
        if (props.image  ) {

            const pdf = new jsPDF({
                orientation: (height > width) ? "portrait" : "landscape",
                unit: "pt",
                format: [height, width],
                
            });

            // console.log(pdf);
            // console.log(props.resume.template);
            pdf.addImage(img, 'PNG', 0, 0, width, height, 'SLOW');
            // pdf.save("resume.pdf");
            pdf.setDisplayMode(2, 'twoleft', 'UseOutlines');
            // pdf.activeFontSize(15)
            pdf.save(`${props.resume.personal.firstName}_Resume.pdf`)
            enqueueSnackbar('Downloaded! Cast your Resume PDF. All the Best! ', { variant: 'success' });
            // navigate('/dashboard');
        }


    }

  return (
    <div>
      <h1>JWT Test</h1>
      <p>Check the console for JWT operations output.</p>
      <div className=" build-resume preview">
                    <button onClick={ generatePdf } disabled={(props.image) ? '' : true} >Download PDF <FontAwesomeIcon icon={faDownload} /></button>
                    <h4>Preview</h4>
                    <Template1 key={1} renderPreview={props.resume[props.section]} />
                    <Template2 key={2} renderPreview={props.resume[props.section]} />
                    {(props.image) ? <img id='preview' alt='preview' src={props.image} /> : ''}
                    <br />

                </div>
    </div>
  );
};

const mapStateToProps=state=>{
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

export default connect(mapStateToProps, mapDispatchToProps)(JwtTestComponent);


