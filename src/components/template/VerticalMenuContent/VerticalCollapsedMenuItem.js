import React from "react"
import { Menu, Dropdown, Badge } from "components/ui"
import { Link, useLocation } from "react-router-dom"
import VerticalMenuIcon from "./VerticalMenuIcon"
import { Trans } from "react-i18next"
import { AuthorityCheck } from "components/shared"
import { protectedRoutes } from "configs/routes.config"

const { MenuItem, MenuCollapse } = Menu

const DefaultItem = ({ nav, onLinkClick, userAuthority, dataWaiting }) => {
  const location = useLocation()
  const route = protectedRoutes

  function findMatchingPath(location, data) {
    const matchingItem = data.find((item) => {
      const regexString = item.path.replace(/:[^/]+/g, "([^/]+)")
      const regex = new RegExp(`^${regexString}$`)
      return regex.test(location)
    })

    return matchingItem || null
  }

  const matchingObject = findMatchingPath(location.pathname, route)
  const parrentActive = matchingObject?.key?.split(".")?.[0]

  const dataWaitings = dataWaiting?.map((item, index, array) => {
    // if module name different with path
    if (item.module === "claim-expense") {
      return { ...item, module: "expenses" }
    }
    if (item.module === "upcountry") {
      return { ...item, module: "up-country" }
    }
    return item
  })

  const storedDataWaiting = JSON.parse(localStorage.getItem("auto_waiting"))
  const existingDataWaiting = storedDataWaiting || {}

  const modulHasWaiting = ["approval", "sales"]

  return (
    <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
      <MenuCollapse
        label={
          <>
            <VerticalMenuIcon icon={nav.icon} />
            <span>
              <Trans i18nKey={nav.translateKey} defaults={nav.title} />
            </span>
          </>
        }
        key={nav.key}
        eventKey={nav.key}
        expanded={false}
        className={`mb-2 text-slate-500 hover:text-blue-999 hover:font-bold ${
          parrentActive === nav.key && "bg-grey-50 !text-blue-999 !font-bold"
        }`}
      >
        {nav.subMenu.map((subNav) => {
          const path = subNav?.path?.substring(
            subNav?.path?.lastIndexOf("/") + 1
          )
          const isPathIncluded = modulHasWaiting.some((keyword) =>
            subNav.path.includes(keyword)
          )
          const findModule = dataWaitings?.find((item) => item?.module === path)

          return (
            <AuthorityCheck
              userAuthority={userAuthority}
              authority={subNav.authority}
              key={subNav.key}
            >
              <MenuItem eventKey={subNav.key}>
                {subNav.path ? (
                  <Link
                    className="h-full w-full flex items-center"
                    onClick={() => {
                      if (subNav?.externalPath) {
                        window.open(subNav?.externalPath)
                      } else {
                        onLinkClick?.({
                          key: subNav.key,
                          title: subNav.title,
                          path: subNav.path,
                        })

                        if (isPathIncluded && !!findModule) {
                          existingDataWaiting["isWaiting"] = true
                          localStorage.setItem(
                            "auto_waiting",
                            JSON.stringify(existingDataWaiting)
                          )
                        } else {
                          localStorage.removeItem("auto_waiting")
                        }
                      }

                      localStorage.removeItem("report")
                    }}
                    to={subNav.path}
                  >
                    <li>
                      <div
                        className={`w-[204px] h-[36px] text-slate-500 rounded-md hover:text-blue-999 hover:font-bold hover:bg-grey-50 flex items-center ml-4 px-2 py-2.5 
                    ${
                      matchingObject?.key === subNav.key &&
                      "bg-grey-50 !text-blue-999 !font-bold"
                    }
                    `}
                      >
                        <Trans
                          i18nKey={subNav.translateKey}
                          defaults={subNav.title}
                        />
                        {isPathIncluded &&
                          dataWaitings?.find((dw) => dw?.module === path) && (
                            <Badge
                              className="ml-2"
                              content={
                                dataWaitings?.find((dw) => dw?.module === path)
                                  ?.total
                              }
                              innerClass="text-[9px] rounded py-0 px-[6px]"
                            />
                          )}
                      </div>
                    </li>
                  </Link>
                ) : (
                  <span>
                    <Trans
                      i18nKey={subNav.translateKey}
                      defaults={subNav.title}
                    />
                  </span>
                )}
              </MenuItem>
            </AuthorityCheck>
          )
        })}
      </MenuCollapse>
    </AuthorityCheck>
  )
}

const CollapsedItem = ({ nav, onLinkClick, userAuthority, direction }) => {
  const menuItem = (
    <MenuItem key={nav.key} eventKey={nav.key} className="mb-2">
      <VerticalMenuIcon icon={nav.icon} />
    </MenuItem>
  )

  return (
    <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
      <Dropdown
        trigger="hover"
        renderTitle={menuItem}
        placement={direction === "rtl" ? "middle-end-top" : "middle-start-top"}
      >
        {nav.subMenu.map((subNav) => (
          <AuthorityCheck
            userAuthority={userAuthority}
            authority={subNav.authority}
            key={subNav.key}
          >
            <Dropdown.Item eventKey={subNav.key}>
              {subNav.path ? (
                <Link
                  className="h-full w-full flex items-center"
                  onClick={() => {
                    if (subNav?.externalPath) {
                      window.open(subNav?.externalPath)
                    } else {
                      onLinkClick?.({
                        key: subNav.key,
                        title: subNav.title,
                        path: subNav.path,
                      })
                    }
                  }}
                  to={subNav.path}
                >
                  <span>
                    <Trans
                      i18nKey={subNav.translateKey}
                      defaults={subNav.title}
                    />
                  </span>
                </Link>
              ) : (
                <span>
                  <Trans
                    i18nKey={subNav.translateKey}
                    defaults={subNav.title}
                  />
                </span>
              )}
            </Dropdown.Item>
          </AuthorityCheck>
        ))}
      </Dropdown>
    </AuthorityCheck>
  )
}

const VerticalCollapsedMenuItem = ({ sideCollapsed, ...rest }) => {
  return sideCollapsed ? <CollapsedItem {...rest} /> : <DefaultItem {...rest} />
}

export default VerticalCollapsedMenuItem
