import ConversationList from './components/ConversationList/ConversationList';
import MessageArea from './components/MessageArea/MessageArea';
import Navbar from './components/Navbar/Navbar';
import { useAuth } from './contexts/AuthContext';
import './styles/global.scss';
import { useNavigate } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import { useNavbar } from './contexts/NavbarContext';
import CreateConversation from './components/CreateConversation/CreateConversation';
import { useEffect } from 'react';
import AppInfo from './components/AppInfo/AppInfo';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import ConversationOptions from './components/ConversationOptions/ConversationOptions';

export default function App() {
  const {
    isConversationListOpen,
    isProfileOpen,
    isCreateConversationOpen,
    isAppInfoOpen,
    isUpdateProfileOpen,
    isConversationOptionsOpen,
  } = useNavbar();
  const { user, checkTokenIsValid } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const tokenIsValid = await checkTokenIsValid();
      if (!tokenIsValid) {
        // Token is invalid, log out the user and redirect to login page
        navigate('/login');
      }
    };

    // Check token validity when component mounts and user changes
    if (user) {
      validateToken();
    } else {
      navigate('/login'); // Redirect to login page if user is not logged in
    }
  }, [user, checkTokenIsValid, navigate]);

  return (
    <div className="appContainer">
      <Navbar />
      {isConversationListOpen && <ConversationList />}
      {isProfileOpen && <Profile />}
      {isCreateConversationOpen && <CreateConversation />}
      {isAppInfoOpen && <AppInfo />}
      {isUpdateProfileOpen && <UpdateProfile />}
      {isConversationOptionsOpen && <ConversationOptions />}
      <MessageArea />
    </div>
  );
}
