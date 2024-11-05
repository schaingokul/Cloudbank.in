import React, { useState, useRef } from 'react'
import "./uiDesign.css"
import model from './model.jsx';

const UiDesign = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const fileInputRefs = useRef({});

    var curretPage = model[activeIndex].pageName;
    
    
    const fieldrender =(field)=> 
        {
            switch(field.type)
            {
                case "string":
                    return (
                        <div className="input" key={field.fieldId}>
                            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontSize: '16px' }}>{`${field.fieldName}`}</span>
                                <i className="material-icons" style={{ fontSize: '16px', marginLeft: '4px' }}>error_outline</i>
                            </div>
                            <input type='text' placeholder={`${field.fieldName}`} required />
                        </div>
                    );
                    case "dropdown":
                        return (
                            <div className="input" key={field.fieldId}>
                                <div >{field.fieldName}</div>
                                <select defaultValue= "" required>
                                    <option value="" disabled>{field.fieldName}</option>
                                    {field.selectableValues.map((value, index)=> (
                                        <option key={index} value={value}>{value}</option>
                                    ))}
                                </select>
                            </div>
                        );
                    case 'textarea':
                        return (
                            <>
                                <div className='filename'>{field.fieldName}</div>
                                <div className="textarea" key={field.fieldId}>
                                    <textarea rows={3} placeholder={`Enter ${field.fieldName}`} />
                                </div>
                            </>
                            
                        );
                    case 'file':
                        if (!fileInputRefs.current[field.fieldId]) {
                            fileInputRefs.current[field.fieldId] = React.createRef();
                        }
                        return (
                            <>
                                    <div className='filename'>{field.fieldName}</div>
                                    <div  className="fileupload" key={field.fieldId}
                                        onClick={() => fileInputRefs.current[field.fieldId].current.click()}>
                                        <label><span style={{ color: "#007bff", cursor: "pointer" }}>Browse</span> or Drop & Demo to Attach a file</label>
                                        <input type="file" ref={fileInputRefs.current[field.fieldId]} style={{ display: "none" }} onChange={(e) => handleFileUpload(e, field.fieldId)}/>
                                </div>
                            </>
                        );
                    default:
                        return null;
            }
        }

        const handleFileUpload = (e, fieldId) => {
            const file = e.target.files[0];
            if (file) {

                const fileName = window.innerWidth < 600 ? "mobile.png" : "web.png"; 
                const renamedFile = new File([file], fileName, { type: file.type });
                console.log("Renamed file:", renamedFile); 
            }
        };

        const handleBack = () => {
            setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        };
    
        const handleContinue = () => {
            setActiveIndex((prevIndex) => Math.min(prevIndex + 1, model.length - 1));
        };

    return (
    <div className='block'>
        <div className='topheader'>
            <div className='left'>
                <p className='box'>CB</p>
                <p>Cloudbank.in</p>
            </div>
            <div className='right' style={{display: "flex", textAlign: "center"}}>
            <p className='circle'>GK</p>
                    <p>Gokul Easwaran</p>
                    <p><span style={{ fontSize: "40px"}}>&#129171;</span></p>
            </div>
        </div>
        
        {/*content */}
        <div className='conatins'>
                <div className='secondheader'>
                    {model.map((step, index) => (
                        <div key={index} className={`stepper ${index === activeIndex ? "active" : ""}`}>
                            <p className={`num ${index === activeIndex ? "active" : ""}`}>{index+1}</p>
                            <p className={`text ${index === activeIndex ? "active" : ""}`}>{step.pageName}</p>
                        </div>
                    ))}
                </div>
                <div className='container'>
                    <div className='containcontent' >
                        <div className='boxmodel'  >
                            {model.map((value, index) => (
                                <div key={index}>
                                    {value.pageName === curretPage && (
                                        <>
                                            <h3 className="h3text" >{value.pageName}</h3>
                                            <div className='field-group'>
                                                <div className='property-info'>
                                                    {value.fields.map((field) => 
                                                        (field.fieldName === 'Property Name' || 
                                                        field.fieldName === 'Property Type' || 
                                                        field.fieldName === 'Number of Units') && fieldrender(field)
                                                    )}
                                                </div>
                                                
                                                <div className='address-info'>
                                                    {value.fields.map((field) => 
                                                        (field.fieldName === 'Property Address' || 
                                                        field.fieldName === 'File Attachment') && fieldrender(field)
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                <div className='button'>
                    <button className='back' onClick={() => handleBack()}>Back</button>
                    <button className='continue' onClick={() => handleContinue()}>Continue</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UiDesign
