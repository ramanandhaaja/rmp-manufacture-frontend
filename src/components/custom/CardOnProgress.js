import React from 'react'

function CardOnProgress({ moderation, classMain, className }) {
    const progressRatio = (moderation?.step_current || 0) / (moderation?.step_total);

    return (
        <div className={`relative w-[120px] ${classMain}`}>
            <div className={`flex h-10 overflow-hidden text-xs bg-white rounded border-[2px] border-blue-200 ${className}`}>
                <div className="absolute flex flex-1 w-full h-full justify-center items-center text-main-600">
                    {moderation?.step_current || 0} / {moderation?.step_total}
                </div>
                <div
                    style={{ width: `${progressRatio * 100}%` }}
                    className="flex flex-col whitespace-nowrap  justify-center bg-blue-200 shadow-none py-1"
                >
                </div>
            </div>
        </div>
    )
}

export default CardOnProgress