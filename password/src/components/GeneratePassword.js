import './password.css';
import DisplayPassword from './DisplayPassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';


export default function GeneratePassword() {
    const [passwordLength, setPasswordLength] = useState(10)
    const [bigLetters, setBigLetters] = useState(false)
    const [symbols, setSymbols] = useState(false)
    const [numbers, setNumbers] = useState(false)
    const [smallLetters, setSmallLetters] = useState(false)
    const [password, setPassword] = useState('')
    const [strengthClass, setStrengthClass] = useState('')
    


    const GenerateRandomPassword = () =>{
        let characters = '';
        if (bigLetters) {
            characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    
        if (smallLetters) {
            characters += 'abcdefghijklmnopqrstuvwxyz';
    }
    
        if (numbers) {
          characters += '0123456789';
    }
    
        if (symbols) {
          characters += '!@#$%^&*()_+[]{}|;:,.<>?';
    }
    return {characters, 'poolSize' : characters.length} 

 }


    const finalPassword = ()=>{
        let { characters } = GenerateRandomPassword()
        let password = ''
        for(let i = 0; i < passwordLength; i++){
            password += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return setPassword(password);
        
    }
    console.log(finalPassword)


    const calculateStrength = () =>{
       const { poolSize } = GenerateRandomPassword()
       const strength = passwordLength * Math.log2(poolSize)
       return strength
    }
    // check for streength

    const getStrengthType = () => {
        const strengthInBits = calculateStrength();
        let strengthType = '';
    
        if (strengthInBits >= 80) {
            strengthType = 'strong';
        } else if (strengthInBits >= 40) {
            strengthType = 'medium';
        }
        else{
            strengthType = 'weak'
        }
    
        return strengthType;
    };
    
    useEffect(()=>{
        setStrengthClass(getStrengthType());
    }, [getStrengthType])
    




  return (
    <div className='wrapper'>
      <DisplayPassword password={password} style={{ marginBottom: '20px' }} />
      <div className='second-component'>
        <div className='character-wrapper'>
          <p>Character Length</p>
          <span>{passwordLength && passwordLength}</span>
        </div>
        
        <div className='form-input'>
            <input 
            type='range' 
            step={1} min={1} max={20}
            value={passwordLength}
            onChange={(e)=>setPasswordLength(e.target.value)}
            />
            <label for='uppercase'>
                <input id='uppercase' type='checkbox' checked={bigLetters} onChange={()=>setBigLetters(!bigLetters)} />
                Include Uppercase Letters
            </label>
            <label for='lowercase'>
                <input type='checkbox' id='lowercase' checked={smallLetters} onChange={()=>setSmallLetters(!smallLetters)} />
                Include Lowercase Letters
            </label>
            <label for='symbols'>
                <input id='symbols' type='checkbox' checked={symbols} onChange={()=>setSymbols(!symbols)} />
                Include Special Characters
            </label>
            <label for='numbers'>
                <input id='numbers' type='checkbox' checked={numbers} onChange={()=>setNumbers(!numbers)} />
                Include Numbers
            </label>
        </div>

        <div className='strength-wrapper'>
          <span style={{color : 'gray', fontSize: 16, fontWeight: 500, padding: 15}}>STRENGTH</span>
          <div className={`strength-icons ${password && strengthClass}`}>
            <span style={{fontSize: 19, fontWeight: 600}} >{password? strengthClass.toLocaleUpperCase() : ''}</span>
           <div className={`font-awesome-icons  ${password? strengthClass : ''}`}>
           <FontAwesomeIcon className='fa-minus' icon={faMinus} />
            <FontAwesomeIcon className='fa-minus' icon={faMinus} />
            <FontAwesomeIcon className='fa-minus' icon={faMinus} />
           </div>
          </div>
        </div>

        <div className='button-component'>
          <button onClick={finalPassword}>
          Generate <FontAwesomeIcon style={{marginLeft : 5, }} icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
