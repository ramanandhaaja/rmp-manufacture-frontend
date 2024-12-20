


const CardProgressStatus = ({ moderation }) => {

  const progressRatio = ((moderation?.step_current || 0) / (moderation?.step_total) * 100).toFixed(3);
  return (
    <div className="flex flex-1 justify-start relative">
      <div className="relative w-[120px] h-[37px] px-1 py-1.5 rounded border-2 border-blue-100 justify-center items-center gap-1 inline-flex">
        <div className="relative text-sky-600 text-sm font-normal font-['Nunito Sans'] leading-tight z-10">
          {moderation?.step_current || 0} / {moderation?.step_total}
        </div>
        <div className="absolute bg-blue-100 h-8 left-0" style={{ maxWidth: 100, width: `${progressRatio}%` }}></div>
      </div>
    </div>
  )
}

export default CardProgressStatus