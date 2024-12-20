import { Notification, toast } from 'components/ui';

export const downloadFile = (resp, filename, type) => {
  try {
    if (resp && resp?.status === 200) {
      const url = window.URL.createObjectURL(new Blob([resp.data], {
        type: `application/${type}`,
      }));

      window.open(url);
    }
  } catch (error) {
    toast.push(<Notification type="danger" title={error?.response?.data?.message || 'Failed to export'} />, {
      placement: 'top-center',
    });
  }
};