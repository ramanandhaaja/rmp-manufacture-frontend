import dayjs from "dayjs"

export  const moderationProcess = (values) => {
    const temp = values[values?.length - 1]
    let dataItems = temp?.moderation?.items?.map((dt, i) => {
      return {
        status: dt?.result,
        position: dt?.moderationUser?.user?.role?.level,
        employee: {
          name: dt?.moderationUser?.user?.name
        },
        description: dt?.remarks,
        updated_at: dt?.updated_at ? dayjs(dt?.updated_at).format('DD/MM/YYYY, HH:mm') : '-'
      }
    })
    dataItems?.sort((a, b) => (a.status === 2) - (b.status === 2));
    return dataItems || []
}

export const GetCurrentApprovalUserId = (currentUser, items) => {
  const result = items?.find(task => task.moderationUser?.map((item) => item?.user_id)?.includes(currentUser) && task.is_current === 1);

  return result;
};
