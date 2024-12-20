import { useCallback, useEffect, useRef, useState } from "react";
import { AdaptableCard } from "components/shared";
import { apiIndex } from "./api";
import { PageConfig } from "./config";
import { Tools } from "./tools";
import { PageTable } from "./table";
import { FormFilter } from "./form_filter";
import { Notification, toast } from "components/ui";
import { FormColumn } from "./form_column";

const dummy = {
  data: [
    {
      id: 1,
      created_at: "2022-11-26T08:38:44",
      updated_at: "2022-12-07T22:18:37",
      name: "Jane Doe",
      email: "jane@example.com",
      email_verified_at: "2020-02-14T11:16:01",
      username: "user1",
      is_active: 0,
    },
    {
      id: 2,
      created_at: "2021-04-06T05:22:47",
      updated_at: "2020-02-21T08:39:12",
      name: "Alice Doe",
      email: "alice@example.com",
      email_verified_at: "2020-09-22T06:13:26",
      username: "user2",
      is_active: 1,
    },
    {
      id: 3,
      created_at: "2021-09-24T16:11:58",
      updated_at: "2022-10-05T08:26:59",
      name: "Charlie Davis",
      email: "charlie@example.com",
      email_verified_at: "2022-11-09T17:36:42",
      username: "user3",
      is_active: 0,
    },
    {
      id: 4,
      created_at: "2022-08-16T17:23:46",
      updated_at: "2020-01-19T07:43:56",
      name: "Bob Johnson",
      email: "bob@example.com",
      email_verified_at: "2022-01-24T07:51:28",
      username: "user4",
      is_active: 1,
    },
    {
      id: 5,
      created_at: "2020-11-18T04:12:16",
      updated_at: "2022-09-17T14:33:04",
      name: "John Doe",
      email: "john@example.com",
      email_verified_at: "2022-02-16T02:30:04",
      username: "user5",
      is_active: 0,
    },
  ],
  meta: {
    current_page: 1,
    from: 1,
    last_page: 8,
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "https://be-ai.royalmedicalink.id/api/v1/finance/expenses?type=pagination&param_module=maintenance&limit=10&sort_by=desc&options%5B0%5D=filter%2Ctype%2Cequal%2C3&relations=moderations.moderation.requestedBy%2Cmoderations.moderation.lastItem%2Cmoderations.moderation.items.moderator%2Cmoderations.moderation.items.moderationUser.user.role%2Citems&page=1",
        label: "1",
        active: true,
      },
      {
        url: "https://be-ai.royalmedicalink.id/api/v1/finance/expenses?type=pagination&param_module=maintenance&limit=10&sort_by=desc&options%5B0%5D=filter%2Ctype%2Cequal%2C3&relations=moderations.moderation.requestedBy%2Cmoderations.moderation.lastItem%2Cmoderations.moderation.items.moderator%2Cmoderations.moderation.items.moderationUser.user.role%2Citems&page=2",
        label: "2",
        active: false,
      },
      {
        url: "https://be-ai.royalmedicalink.id/api/v1/finance/expenses?type=pagination&param_module=maintenance&limit=10&sort_by=desc&options%5B0%5D=filter%2Ctype%2Cequal%2C3&relations=moderations.moderation.requestedBy%2Cmoderations.moderation.lastItem%2Cmoderations.moderation.items.moderator%2Cmoderations.moderation.items.moderationUser.user.role%2Citems&page=3",
        label: "3",
        active: false,
      },
      {
        url: "https://be-ai.royalmedicalink.id/api/v1/finance/expenses?type=pagination&param_module=maintenance&limit=10&sort_by=desc&options%5B0%5D=filter%2Ctype%2Cequal%2C3&relations=moderations.moderation.requestedBy%2Cmoderations.moderation.lastItem%2Cmoderations.moderation.items.moderator%2Cmoderations.moderation.items.moderationUser.user.role%2Citems&page=4",
        label: "4",
        active: false,
      },
      {
        url: "https://be-ai.royalmedicalink.id/api/v1/finance/expenses?type=pagination&param_module=maintenance&limit=10&sort_by=desc&options%5B0%5D=filter%2Ctype%2Cequal%2C3&relations=moderations.moderation.requestedBy%2Cmoderations.moderation.lastItem%2Cmoderations.moderation.items.moderator%2Cmoderations.moderation.items.moderationUser.user.role%2Citems&page=5",
        label: "5",
        active: false,
      },
      {
        url: "https://be-ai.royalmedicalink.id/api/v1/finance/expenses?type=pagination&param_module=maintenance&limit=10&sort_by=desc&options%5B0%5D=filter%2Ctype%2Cequal%2C3&relations=moderations.moderation.requestedBy%2Cmoderations.moderation.lastItem%2Cmoderations.moderation.items.moderator%2Cmoderations.moderation.items.moderationUser.user.role%2Citems&page=6",
        label: "6",
        active: false,
      },
      {
        url: "https://be-ai.royalmedicalink.id/api/v1/finance/expenses?type=pagination&param_module=maintenance&limit=10&sort_by=desc&options%5B0%5D=filter%2Ctype%2Cequal%2C3&relations=moderations.moderation.requestedBy%2Cmoderations.moderation.lastItem%2Cmoderations.moderation.items.moderator%2Cmoderations.moderation.items.moderationUser.user.role%2Citems&page=7",
        label: "7",
        active: false,
      },
      {
        url: "https://be-ai.royalmedicalink.id/api/v1/finance/expenses?type=pagination&param_module=maintenance&limit=10&sort_by=desc&options%5B0%5D=filter%2Ctype%2Cequal%2C3&relations=moderations.moderation.requestedBy%2Cmoderations.moderation.lastItem%2Cmoderations.moderation.items.moderator%2Cmoderations.moderation.items.moderationUser.user.role%2Citems&page=8",
        label: "8",
        active: false,
      },
      {
        url: "https://be-ai.royalmedicalink.id/api/v1/finance/expenses?type=pagination&param_module=maintenance&limit=10&sort_by=desc&options%5B0%5D=filter%2Ctype%2Cequal%2C3&relations=moderations.moderation.requestedBy%2Cmoderations.moderation.lastItem%2Cmoderations.moderation.items.moderator%2Cmoderations.moderation.items.moderationUser.user.role%2Citems&page=2",
        label: "Next &raquo;",
        active: false,
      },
    ],
    path: "https://be-ai.royalmedicalink.id/api/v1/finance/expenses",
    per_page: 10,
    to: 10,
    total: 79,
  },
}

const Page = () => {
  const firstLoad = useRef(true)
  const firstReq = useRef(true)
  const [openFilter, setOpenFilter] = useState(false)
  const [openColumns, setOpenColumns] = useState(false)
  const [ids, setIds] = useState([])
  const [checkboxList, setCheckboxList] = useState([])
  const [localState, setLocalState] = useState({
    loading: false,
    data: dummy?.data,
    meta: dummy?.meta,
    params: {
      q: "",
      type: "pagination",
      page: 1,
      limit: 10,
      order_by: "",
      sort_by: "",
      options: [],
      relations: [].join(),
    },
  })

  const getData = useCallback(
    async (params) => {
      try {
        setLocalState({
          ...localState,
          loading: true,
        })

        const ress = await apiIndex(params)

        if (firstReq.current) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          firstReq.current = false
        }

        if (ress.data?.meta?.current_page !== localState.meta?.current_page) {
          setIds([])
        }

        setLocalState({
          ...localState,
          loading: false,
          data: ress.data?.data || [],
          meta: ress.data?.meta || null,
          params: params,
        })
      } catch (error) {
        toast.push(
          <Notification title={"Error"} type="danger">
            {error?.response?.data?.message ||
              error?.message ||
              "Something went wrong"}
          </Notification>,
          {
            placement: "top-center",
          }
        )
      }
    },
    [localState]
  )

  useEffect(() => {
    if (firstLoad.current) {
      // getData(localState.params)
      firstLoad.current = false
    }
  }, [getData, localState])

  useEffect(() => {
    let x = []

    for (let index = 0; index < PageConfig.listFields.length; index++) {
      const el = PageConfig.listFields[index]
      if (el.is_show) {
        x.push(el.key)
      }
    }
    setCheckboxList(x)
  }, [])

  return (
    <AdaptableCard className="h-full" bodyClass="h-full p-2">
      <div className="">
        <h3 className="text-blue-999 text-2xl font-bold mt-[12px] px-5 py-1">
          {PageConfig.moduleTitle} &raquo; {PageConfig.pageTitle}
        </h3>
        <hr></hr>
        <div className="px-5 my-[12px]">
          <Tools
            localState={localState}
            setLocalState={setLocalState}
            getData={getData}
            deleteIds={ids}
            setIds={setIds}
            openFilter={() => {
              setOpenFilter(!openFilter)
              setOpenColumns(false)
            }}
            openColumns={() => {
              setOpenColumns(!openColumns)
              setOpenFilter(false)
            }}
            checkboxList={checkboxList}
          />
        </div>
        <hr></hr>
      </div>
      <FormFilter
        getData={getData}
        localState={localState}
        // draft={draft}
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
      />

      {openColumns && (
        <div className="border border-slate-500 p-3 mb-5 rounded ">
          <FormColumn
            checkboxList={checkboxList}
            setCheckboxList={setCheckboxList}
          />
        </div>
      )}

      <PageTable
        localState={localState}
        setLocalState={setLocalState}
        getData={getData}
        setIds={setIds}
        bulk_ids={ids}
        checkboxList={checkboxList}
      />
    </AdaptableCard>
  )
}

export default Page;
