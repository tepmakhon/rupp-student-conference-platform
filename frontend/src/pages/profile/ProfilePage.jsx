import DashboardLayout
from "../../components/layouts/DashboardLayout";

import ProfileForm
from "../../components/profile/ProfileForm";

function ProfilePage() {

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-primary">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your profile information
        </p>

      </div>

      <ProfileForm />

    </DashboardLayout>
  );
}

export default ProfilePage;