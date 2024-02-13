import { useNavigate } from 'react-router-dom';

// components
import { IconButtonAnimate } from 'src/components/animate';

//icon
import UserIcon from 'src/assets/svg/icon_user';

//paths
import { PATH_MAIN } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Accountr() {
  const navigate = useNavigate();

  return (
    <>
      <IconButtonAnimate
        onClick={() => navigate(PATH_MAIN.profile)}
        sx={{
          width: { xs: 35, sm: 40, lg: 48 },
          height: { xs: 35, sm: 40, lg: 48 },
          background: { xs: 'transparent', sm: '#383838' },
        }}
      >
        <div style={{ marginTop: 1 }}>
          <UserIcon />
        </div>
      </IconButtonAnimate>
    </>
  );
}
