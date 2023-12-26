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
     
    icon: icon('cms'),
    children : [
      {
        title: 'About Us',
    path: '/dashboard/about-us',
    icon: icon('aboutus'),
      },{
        title: 'Privacy Policy',
    path: '/dashboard/privacy-policy',
    icon: icon('privacypolicy'),
      }
     
    ]
  },
  
  {
    title: 'User Management',
    path: '/dashboard/user-management',
    icon: icon('user_management'),
  },
  
 
];

export default navConfig;
