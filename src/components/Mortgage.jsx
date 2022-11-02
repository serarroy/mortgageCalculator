import React, {useEffect, useState} from 'react'
import '../App.css'

function Mortgage() {

    const [value, setValue] = useState(0);
    const [payment, setPayment] = useState(0);
    const [years, setYears] = useState(1);
    const [rates, setRates] = useState(0.0);
    const [loanAmount, setLoanAmount] = useState(0);
    const [monthly, setMonthly] = useState(0);

    const calculateloanAmount = () => {
        setLoanAmount(value - payment)
    }
    
    const calculatePerMonthPay = () => {
        let p = (value - payment);
        let i = rates / 12 / 100;
        let n = years * 12;
        let month = Math.floor((p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
        setMonthly(month);
    }

    useEffect(() => {
        calculateloanAmount()
    }, [value, payment]);
    

    useEffect(() => {
        calculatePerMonthPay();
    }, [value, payment, rates, years]);
    
    return (
        <div className='mortgage-container'>
            <h1>Mortgage Calculator</h1>
            <div className='slider-parent'>
                <span className='item-mortgage'>Purchase price </span>
                <input type='range' min='0' max='1000000' value={value} onChange={(event) => {setValue(event.target.value);}}/>
                <p className='slider-value'>$ {value}</p>
            </div>
            <div className='slider-parent'>
                <span className='item-mortgage'>Down payment </span>
                <input type='range' min='0' max={value} value={payment} onChange={(event) => {setPayment(event.target.value);}}/>
                <p className='slider-value'>$ {payment}</p>
            </div>
            <div className='slider-parent'>
                <span className='item-mortgage'>Repayment time </span>
                <input type='range' min='1' max='40' value={years} onChange={ (event) => setYears(event.target.value)}/>
                <p className='slider-value'>{years} years</p>
            </div>
            <div className='slider-parent'>
                <span className='item-mortgage'>Interest rate </span>
                <input type='range' min='0.00' max='20.00' step='0.01' precision={2} value={rates} onChange={ (event) => setRates(event.target.value)}/>
                <p className='slider-value'>{rates} %</p>
            </div>
            <div className='result-container'>
                <div className='result-item'>
                    <span>Loan amount</span>
                    <p className='result-value'>$ {loanAmount}</p>
                </div>
                <div className='result-item'>
                    <span>Estimated per month</span>
                    <p className='result-value'>$ {monthly}</p>
                </div>
            </div>
        </div>
    )
}

export default Mortgage;
