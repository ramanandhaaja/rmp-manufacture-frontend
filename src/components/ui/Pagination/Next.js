import React from "react"
import classNames from "classnames"
import { HiChevronRight } from "react-icons/hi"
import useThemeClass from "utils/hooks/useThemeClass"

const Next = (props) => {
  const { textTheme } = useThemeClass()
  const { currentPage, pageCount, pagerClass, onNext } = props

  const disabled = currentPage === pageCount || pageCount === 0

  const onNextClick = (e) => {
    e.preventDefault()
    if (disabled) {
      return
    }
    onNext(e)
  }

  const pagerNextClass = classNames(
    pagerClass.default,
    "pagination-pager-next",
    textTheme,
    disabled ? pagerClass.disabled : pagerClass.inactive
  )

  return (
    <span className={pagerNextClass} onClick={onNextClick}>
      <HiChevronRight size={16} />
    </span>
  )
}

export default Next
