import React,{useState, useEffect} from 'react'
import FormInput from './FormInput'
import PropTypes from 'prop-types'

const BmiCalculator = props => {

    const {getBmiValue} = props;

    const[heightUnit,setHeightUnit]=useState('cm')
    const[weightUnit,setWeightUnit]=useState('kg')
    const[unit,setUnit]=useState('Metric')
    const[count,setCount]= useState({
        heightCount:'0',
        inchesCount:'0',
        weightCount:'0'
    })

    const {heightCount, inchesCount, weightCount} = count;

    /* You can either use UseEffect to give default values or do it by putting it in useState 1st,2nd and 3rd */

    // useEffect(()=>{     
    //     if (unit===''){
    //         setUnit('Metric')
    //         setHeightUnit('m')
    //         setWeightUnit('kg')
    //     }
    // },[unit]);

    /* When you have controlled to uncontrolled error. */

    useEffect(()=>{
        metricBmi(heightCount,weightCount);
        imperialBmi(heightCount,weightCount,inchesCount);
        //eslint-disable-next-line
    },[heightCount,weightCount,inchesCount]);

    const onChangeInput = e => {
        const{name,value}=e.target
        setCount(prevState=>({...prevState, [name]:value}))
    };

    const onSelectTag = e => {
        setUnit(e.target.value)
        if (e.target.value === "Metric"){
            setHeightUnit('cm')
            setWeightUnit('kg')
        }
        else{
            setHeightUnit('ft')
            setWeightUnit('lbs')
        }
    };

    const metricBmi = (height,weight) =>{
        if (height>0 && weight>0){
            const heightToMeter = height/100;
            const bmi = weight/(heightToMeter*heightToMeter)
            getBmiValue(Math.round(bmi));
        }
    };
    
    const imperialBmi = (height,weight,inches) =>{
        if (height>0 && weight>0 && inches>0){
            const heightToInches = (height * 12) + parseInt(inches);
            const bmi = 703*(weight/(heightToInches*heightToInches))
            getBmiValue(Math.round(bmi));
        }
    };

    const resetData = e => {
        e.preventDefault();

        getBmiValue(0);

        setUnit('Metric')
        setCount({
            heightCount:'0',
            inchesCount:'0',
            weightCount:'0'
        })
        setHeightUnit('cm')
        setWeightUnit('kg')
    } 
  return (
    <>
        <div className='bmi-inputs'>
            <div className='input-fields'>
                <div>
                    <span className='label-unit'>Unit</span>
                    <div className='unit'>
                        <select name='unit' value={unit} className='form-control-sm' onChange={onSelectTag}>
                            <option value="Metric">Metric</option>
                            <option value="Imperial">Imperial</option>
                        </select>
                    </div>
                </div>
                <FormInput
                    type='text'
                    name='heightCount'
                    title={`Height (${heightUnit})`}
                    value={heightCount}
                    onChange={onChangeInput}
                />
                {
                    unit === "Imperial"?
                    <FormInput
                    type='text'
                    name='inchesCount'
                    title={`Height (in)`}
                    value={inchesCount}
                    onChange={onChangeInput}
                />:''
                }
                <FormInput
                    type='text'
                    name='weightCount'
                    title={`Weight (${weightUnit})`}
                    value={weightCount}
                    onChange={onChangeInput}
                />
            </div>
            <button className='button' type='submit' onClick={resetData}>
                Reset
            </button>
        </div>
    </>
  )
}

BmiCalculator.propTypes = {
    getBmiValue :PropTypes.func.isRequired
};
export default BmiCalculator