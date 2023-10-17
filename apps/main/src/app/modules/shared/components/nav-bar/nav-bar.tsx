import styles from './nav-bar.module.scss';
import MautomateLogo from '../../../../../assets/mautomate_transparent.png';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {
  FaHouse,
  FaHouseLaptop,
  FaRepeat,
  FaObjectGroup,
  FaCircleUser,
} from 'react-icons/fa6';
import { useRouter } from '../../../routing/hooks/use-router';
import cn from 'classnames';
import { useUserStorage } from '../../../user/hooks/use-user-storage';
import { useNavBar } from '../../hooks/use-nav-bar';

export function NavBar() {
  const { collapsed, setCollapsed } = useNavBar();
  const {
    goToHome,
    goToDevices,
    goToGroups,
    goToProfile,
    goToRoutines,
    currentRoute,
  } = useRouter();
  const { userIdentification } = useUserStorage();
  const menuItems = [
    {
      icon: <FaHouse />,
      onClick: goToHome,
      route: 'home',
    },
    {
      icon: <FaHouseLaptop />,
      onClick: goToDevices,
      route: 'devices',
    },
    {
      icon: <FaRepeat />,
      onClick: goToRoutines,
      route: 'routines',
    },
    {
      icon: <FaObjectGroup />,
      onClick: goToGroups,
      route: 'groups',
    },
  ];

  return (
    <Sidebar
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      className={styles['sidebar']}
      collapsed={collapsed}
    >
      <div
        className={cn(styles['container'], {
          [styles['collapsed']]: collapsed,
        })}
      >
        <div className={styles['header']}>
          <div className={styles['text']}>Mautomate</div>
          <div className={styles['image-container']}>
            <img
              src={MautomateLogo}
              className={styles['logo']}
              alt="Mautomate Logo"
            />
          </div>
        </div>
        <Menu className={styles['menu']}>
          {menuItems.map(({ icon, onClick, route }) => (
            <MenuItem
              icon={icon}
              onClick={onClick}
              key={`item-${route}`}
              className={cn(styles['item'], {
                [styles['selected']]: currentRoute.includes(route),
              })}
            >
              {route}
            </MenuItem>
          ))}
        </Menu>

        {userIdentification && (
          <Menu className={styles['footer']}>
            <MenuItem
              icon={<FaCircleUser />}
              onClick={goToProfile}
              className={cn(styles['item'], {
                [styles['selected']]: currentRoute.includes('profile'),
              })}
            >
              {userIdentification.username}
            </MenuItem>
          </Menu>
        )}
      </div>
    </Sidebar>
  );
}
