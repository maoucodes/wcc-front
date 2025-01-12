import Profile from '../components/Profile';
import Navbar from '../components/Navbar';

const UserProfile = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <Profile />
            </div>
        </div>
    );
};

export default UserProfile;