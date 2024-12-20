import React from 'react'

function CardStatus({ className, width, title, classMain, titleClass, isWaiting }) {
    if(isWaiting){
        return (
        <div className={`${classMain}`}>
            <div className={`w-[${width}px] flex py-2 px-4 rounded justify-center bg-blue-200 text-blue-600`}>
                <div className={`truncate`}>WAITING</div>
            </div>
        </div>
        );
    } else {
        return (
            <div className={`${classMain}`}>
                <div className={`w-[${width}px] flex py-2 px-4 rounded justify-center ${className}`}>
                    <div className={`truncate ${titleClass}`}>{title}</div>
                </div>
            </div>
        );
    }
}

export default CardStatus