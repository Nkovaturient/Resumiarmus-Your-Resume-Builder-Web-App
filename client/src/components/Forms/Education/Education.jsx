import React, { useState } from 'react'
import './Education.css'
import FormSection from '../../common/FormSection/FormSection';

export default function Education({resume}) {
    const school = {
        university: "",
        degree: "",
        startDate: "",
        endDate: "",
        gpa: ""
    };

    return (
        <>
        <div className="education">
            <h6>Education Details</h6>
            <FormSection input={school} name="Institution" section="education" resume={resume} />

        </div>
        </>
    )
}