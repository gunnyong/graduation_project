import React from 'react';
import Menu from '../components/Menu.js';

const Main = () => {

    return (
        <div className="back">
            <div>
            <Menu />
            {/* 타이틀 */}
            <div className='flex zeroMargin'>
                <div style={{width:"600px"}}>
                    <div style={{fontSize:"100px", fontWeight:"bold", textAlign:"right"}}>
                        자연 지능 화단
                    </div>
                    <div style={{fontSize:"60px", fontWeight:"bold", textAlign:"right"}}>
                        관리자 모드
                    </div>
                </div>
            </div>
            </div>
            <img src="/images/grey.png" alt="메인 로고"  style={{width:"1050px"}}/>
        </div>
    );
};

export default Main;
