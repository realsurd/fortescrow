import { useSnackbar } from 'notistack';

export const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notify = {
    error: (message: string) => {
      enqueueSnackbar(message, {
        variant: 'error',
      });
    },
    success: (message: string) => {
      enqueueSnackbar(message, {
        variant: 'success',
      });
    },
    warning: (message: string) => {
      enqueueSnackbar(message, {
        variant: 'warning',
      });
    },
    info: (message: string) => {
      enqueueSnackbar(message, {
        variant: 'info',
      });
    },
  };

  return { notify };
};
