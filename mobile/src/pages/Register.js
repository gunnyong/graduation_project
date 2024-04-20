import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState('');
    const [email, setEmail] = useState('');

    const handleUserIdChange = (event) => setUserId(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);
    const handleNameChange = (event) => setName(event.target.value);
    const handleBirthChange = (event) => setBirth(event.target.value);
    const handleGenderChange = (event) => setGender(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            // 서버에 보낼 객체
            const user = {
                user_ID: userId,
                password,
                name,
                gender, // 'male', 'female', 'other' 중 하나여야 합니다.
                birth,
                email,
                // register_date와 status는 서버에서 처리됩니다.
            };
            const response = await axios.post('http://ceprj.gachon.ac.kr:60007/api/users/register', user);
            navigate('/');
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다.');
        }
    };

    return (
        <div className='mobile greenBack'>
            <div className='greenTop'>회원 가입</div>
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: "10px" }}>
                    아이디<br />
                    <input 
                        className='inputText' 
                        type="text" 
                        placeholder='아이디 입력' 
                        value={userId} 
                        onChange={handleUserIdChange} 
                    />
                </div>
                <div>
                    비밀번호<br />
                    <input 
                        className='inputText' 
                        type="password" 
                        placeholder='비밀번호 입력' 
                        value={password} 
                        onChange={handlePasswordChange} 
                    />
                </div>
                <div>
                    비밀번호 확인<br />
                    <input 
                        className='inputText' 
                        type="password" 
                        placeholder='비밀번호 확인' 
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange} 
                    />
                </div>
                <div>
                    이메일<br />
                    <input 
                        className='inputText' 
                        type="email" 
                        placeholder='이메일 입력' 
                        value={email} 
                        onChange={handleEmailChange} 
                    />
                </div>
                <div style={{ margin: "auto", display: "flex", marginBottom: "20px" }}>
                    <div style={{ margin: "auto" }}>
                        이름<br />
                        <input 
                            className='inputText' 
                            type="text" 
                            placeholder='이름 입력' 
                            style={{ width: "150px" }} 
                            value={name} 
                            onChange={handleNameChange} 
                        />
                    </div>
                    <div style={{ margin: "auto" }}>
                        생년월일<br />
                        <input 
                            className='inputText' 
                            type="text" 
                            placeholder='예) 989219' 
                            style={{ width: "150px" }} 
                            value={birth} 
                            onChange={handleBirthChange} 
                        />
                    </div>
                </div>
                <div className='flex' style={{  marginBottom: "10px", marginTop: "-10px" }}>
                    <div style={{ width:"50px",marginRight: "10px", marginLeft:"-5px", marginTop:"20px" }}>성별</div>
                    <div className="whiteBox flex zeroMargin" style={{ width: "300px", height: "50px", justifyContent:"center" }}>
                        <label htmlFor="male" style={{ marginRight: "20px" }}>
                            <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={handleGenderChange}
                            style={{ accentColor: 'black' }}
                            />
                            남자
                        </label>
                        <label htmlFor="female" style={{ marginRight: "20px" }}>
                            <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={handleGenderChange}
                            style={{ accentColor: 'black' }}
                            />
                            여자
                        </label>
                        <label htmlFor="other">
                            <input
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            checked={gender === 'other'}
                            onChange={handleGenderChange}
                            style={{ accentColor: 'black' }}
                            />
                            기타
                        </label>
                    </div>
                </div>
                <button type="submit" className='greenButton' style={{ width: "140px", height: "45px" }}>
                    회원 가입
                </button>
            </form>
        </div>
    );
};

export default Register;
