import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification(props) {
    console.log(props)
    const { openNotification, setOpenNotification } = props

    const handleClose = (event) => {
        setOpenNotification(false);
    };

    return (
        <Snackbar
            open={openNotification}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}
