import React from 'react';
import Template2 from './Template2/Template2';
import Template1 from './Template1/Template1';

const HiddenResume = (props) => {

    return (
        <>
            {props.id === 'template1' ? <Template1/> : <div></div>}
            {props.id === 'template2' ? <Template2 /> : <div></div>}
        </>
    )

}

export default HiddenResume