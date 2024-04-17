import React from 'react';
import Menu from '../components/Menu.js';

const Main = () => {

    return (
        <div className="back flex">
            <Menu />
            <div className='flex'>
                <div className='contents'>
                    <div style={{width:"600px", margin:"40px 0px 0px 20px"}}>
                        <div style={{fontSize:"100px", fontWeight:"bold", textAlign:"right"}}>
                            자연 지능 화단
                        </div>
                        <div style={{fontSize:"60px", fontWeight:"bold", textAlign:"right"}}>
                            관리자 모드
                        </div>
                    </div>
                    <img src="/images/grey.png" alt="메인 로고"  style={{width:"1050px", position:"relative", left:"200px", top:"120px"}}/>
                </div>
            </div>
        </div>
    );
};

export default Main;
