//redux
import { useDispatch } from 'react-redux';

// components
import { IconButtonAnimate } from 'src/components/animate';

//svgs
import Logout from 'src/assets/svg/icon_logout';

//slices
import { logoutType } from 'src/redux/slices/logout';

export default function LogoutButton() {
  const dispatch = useDispatch();

  return (
    <>
      <IconButtonAnimate
        onClick={() => dispatch(logoutType({ logout: true }))}
        sx={{
          width: { xs: 35, sm: 40, lg: 48 },
          height: { xs: 35, sm: 40, lg: 48 },
          background: { xs: 'transparent', sm: '#383838' },
        }}
      >
        <div style={{ marginTop: 1 }}>
          <Logout />
        </div>
      </IconButtonAnimate>
    </>
  );
}
