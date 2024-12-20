import React from "react"
import classNames from "classnames"
import { HiChevronLeft } from "react-icons/hi"
import useThemeClass from "utils/hooks/useThemeClass"

const Prev = (props) => {
  const { textTheme } = useThemeClass()
  const { currentPage, pagerClass, onPrev } = props

  const disabled = currentPage <= 1

  const onPrevClick = (e) => {
    if (disabled) {
      return
    }
    onPrev(e)
  }

  const pagerPrevClass = classNames(
    pagerClass.default,
    "pagination-pager-prev",
    textTheme,
    disabled ? pagerClass.disabled : pagerClass.inactive
  )

  return (
    <span className={pagerPrevClass} onClick={onPrevClick}>
      <HiChevronLeft size={16} />
    </span>
  )
}

export default Prev
