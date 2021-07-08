import React from 'react';
import { useHistory } from 'react-router-dom';
import { withSwal } from 'react-sweetalert2';

import Button from '@material-ui/core/Button';

import { useAuth } from '../../services/supabase/auth/Auth';

import { useStyles } from './styles';

export default withSwal((props) => {
  const { swal, text, from } = props;

  const { user, googleSignIn, facebookSignIn } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  const handlePostulation = () => {
    if (user) {
      history.push(`/postulation/${props.jobId}`);
      return;
    }

    swal
      .fire({
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: `<i class="fab fa-google ${classes.sweetIcon}"></i>`,
        cancelButtonText: `<i class="fab fa-facebook-square ${classes.sweetIcon}"></i>`,
        width: '20rem',
        title: 'Iniciar sesión con:',
        buttonsStyling: false,
        customClass: {
          confirmButton: classes.sweetButton,
          cancelButton: classes.sweetButton,
          title: classes.title,
          popup: classes.root,
        },
      })
      .then((click) => {
        if (click.isConfirmed) googleSignIn();
        else if (click.dismiss === swal.DismissReason.cancel) facebookSignIn();
      })
      .catch(() => alert('Algo salio mal :('));
  };

  return (
    <Button
      onClick={handlePostulation}
      className={
        text === 'Postularme'
          ? from !== 'job'
            ? classes.largeButton
            : classes.postSmallButton
          : text === 'Actualizar'
          ? from !== 'job'
            ? classes.largeButton
            : classes.actSmallButton
          : text === 'Login' && classes.loginButton
      }
    >
      {text}
    </Button>
  );
});
