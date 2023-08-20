import React , {useState} from 'react'
import BmiCalculator from './BmiCalculator'

const Bmi = () => {
    const [bmiValue,setBmiValue] =useState('0');

    const getBmiClass=bmi=>{
        if(bmi > 0 && bmi <= 18.5) return 'Underweight';
        if(bmi > 18.5 && bmi <= 24.9) return 'Normal';
        if(bmi > 24.9 && bmi <= 29.9) return 'Overweight';
        if(bmi >29.9) return 'Obese';
    }
    const bmiCategory = getBmiClass(bmiValue)

    let bmiClass = '';
    if (bmiValue > 0 && bmiCategory){
        bmiClass=bmiCategory.toLowerCase();
    }

    const bmiBackgroundColor=bmi=>{
        if(bmi > 0 && bmi <= 18.5) return '#4AA1F3';
        if(bmi > 18.5 && bmi <= 24.9) return '#FED88B';
        if(bmi > 24.9 && bmi <= 29.9) return '#E0E3DA';
        if(bmi >29.9) return '#FF5411';
    }

  return (
    <>
        <div className='calculator'
            style={{backgroundColor: bmiBackgroundColor(bmiValue)}}
        >
            <h3>Body Mass Index Calculator</h3>
            <div className='bmi-result-container'>
                <div className='bmi-result'>
                    <div className='bmi-result-number'>
                        Body Mass Index (BMI) = {bmiValue}
                    </div>
                    <div className={`bmi-category ${bmiClass}`}>
                        {bmiCategory}
                    </div>
                </div>
            </div>
            <BmiCalculator getBmiValue={setBmiValue}/>
        </div>
    </>
  )
}

export default Bmi