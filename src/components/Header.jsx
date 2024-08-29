import Logo from '../assets/Logo.svg';
import ProfilePic from '../assets/Profile.png';

const Header = ({ background }) => {
  return (
    <div className="w-full md:w-1/4 p-6 flex flex-col justify-between"
    >
      <div className="mb-8">
        <img src={Logo} alt="Spotify Logo" className="w-24 mb-4" />
      </div>
      <div className="mt-8 flex">
        <img src={ProfilePic} alt="Profile" className="w-12 h-12 rounded-full" />
      </div>
    </div>
  );
};

export default Header;