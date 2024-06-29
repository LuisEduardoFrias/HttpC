//
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography
      variant='body2'
      align='center'
      sx={{
        color: 'white',
      }}>
      {'Copyright © '}
      <Link
        color='#ff1e1e'
        href='https://luiseduardofrias.github.io/profile/'>
        Arrivel registration
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
