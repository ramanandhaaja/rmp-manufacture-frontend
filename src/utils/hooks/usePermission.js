import { getPermissionApi } from "../../services/AuthService";

function usePermissions() {
  const checkPermission = async ({ page, id, role }) => {
    const params = {
      page: page,
      id: id,
      role: role,
    };
    const response = await getPermissionApi(params);
    if (response.data.permissions) {
    }

    return {
      canApprove: true,
      canVerifiy: true,
      canCreate: true,
      canEdit: false,
    };
  };
}
