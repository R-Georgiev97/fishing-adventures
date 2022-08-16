import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorAlert = (props) => {
  let error = props.error;

  const handleClose = () => {
    props.setError(false);
  };

  return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Snackbar open={error} autoHideDuration={600}>
          <Alert onClose={handleClose}
                 severity="warning">{props.message}</Alert>
        </Snackbar>
      </Stack>
  );
};

export default ErrorAlert;
