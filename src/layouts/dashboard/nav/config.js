// component
import SvgColor from '../../../components/svg-color';
import LogoutIcon from '@mui/icons-material/Logout';
import FeedIcon from '@mui/icons-material/Feed';
import QuizIcon from "@mui/icons-material/Quiz";
import PolicyIcon from '@mui/icons-material/Policy';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
 
  
  {
    title: 'User Management',
    path: '/user-management',
    icon: icon('user_management'),
  },


  {
    title: 'CMS Management',
    // path: "/cms",
    icon: <FeedIcon />,
    noClass:"true",
    children: [
      {
        title: "FAQ Management",
        path: "/cms/faq",
        icon: <QuizIcon />,
      },
      {
        title: "Privacy Policy",
        path: "/cms/privacy-policy",
        icon: <PolicyIcon />,
      },
      {
        title: "Terms & Conditions",
        path: "/cms/terms-conditions",
        icon: <FeedIcon />,
      },
      
      // {
      //   title: "Tagline Management",
      //   path: "/tagline",
      //   icon: <QuizIcon />,
      // },
      // {
      //   title: "FAQ Management",
      //   path: "/faq",
      //   icon: <QuizIcon />,
      // },
      // {
      //   title: "Privacy policy",
      //   path: "/privacy",
      //   icon: <QuizIcon />,
      // },
      // {
      //   title: "Terms & Conditions",
      //   path: "/terms",
      //   icon: <QuizIcon />,
      // },
      // {
      //   title: "Social Media",
      //   path: "/social-media",
      //   icon: <QuizIcon />,
      // },
      // {
      //   title: "About Us",
      //   path: "/aboutUs",
      //   icon: <QuizIcon />,
      // },

    ]
  },
  {
    title: 'Logout',
    path: '/login',
    icon: <LogoutIcon />,
  
  },
  
 
];

export default navConfig;
