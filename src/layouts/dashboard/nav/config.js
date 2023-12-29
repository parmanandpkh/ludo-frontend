// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'CMS Management',
    path: '/cms-management',
    icon: icon('cms'),
   
  },
  
  {
    title: 'User Management',
    path: '/user-management',
    icon: icon('user_management'),
  },
  
 
];

export default navConfig;
