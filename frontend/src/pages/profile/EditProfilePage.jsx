import {

  useEffect,

  useState,

} from "react";

import {

  useNavigate,

} from "react-router-dom";

import toast

from "react-hot-toast";

import DashboardLayout

from "../../components/layouts/DashboardLayout";

import {

  getMyProfile,

  updateMyProfile,

} from "../../api/profileApi";

import ProfileAvatar

from "../../components/profile/ProfileAvatar";

import ProfileCard

from "../../components/profile/ProfileCard";

function EditProfilePage() {

  const navigate =

  useNavigate();

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    saving,

    setSaving,

  ] = useState(false);

  const [

    profile,

    setProfile,

  ] = useState(null);

  const [

    form,

    setForm,

  ] = useState({

    fullName: "",

    phoneNumber: "",

    gender: "",

    dateOfBirth: "",

    bio: "",

    profileImageUrl: "",

    academicYear: "",

    websiteUrl: "",

  });

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile =

  async () => {

    try {

      setLoading(true);

      const data =

      await getMyProfile();

      setProfile(data);

      setForm({

        fullName:

        data.profile

        ?.fullName ||

        "",

        phoneNumber:

        data.profile

        ?.phoneNumber ||

        "",

        gender:

        data.profile

        ?.gender ||

        "",

        dateOfBirth:

        data.profile

        ?.dateOfBirth

        ?

        data.profile

        .dateOfBirth

        .slice(0,10)

        :

        "",

        bio:

        data.profile

        ?.bio ||

        "",

        profileImageUrl:

        data.profile

        ?.profileImageUrl ||

        "",

        academicYear:

        data.student

        ?.academicYear ||

        "",

        websiteUrl:

        data.organization

        ?.websiteUrl ||

        "",

      });

    }

    catch(error){

      console.error(error);

      toast.error(

        "Failed to load profile"

      );

    }

    finally{

      setLoading(false);

    }

  };

  const handleSubmit =

  async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await updateMyProfile(

        form

      );

      toast.success(

        "Profile updated"

      );

      navigate(

        "/profile"

      );

    }

    catch(error){

      console.error(error);

      toast.error(

        error?.response

        ?.data?.message ||

        "Update failed"

      );

    }

    finally{

      setSaving(false);

    }

  };

  if (loading) {

    return (

      <DashboardLayout>

        <div

          className="

          flex

          justify-center

          items-center

          py-24

          text-gray-500

          "

        >

          Loading profile...

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div

        className="

        max-w-6xl

        mx-auto

        "

      >

        <ProfileCard>

          <form

            onSubmit={

              handleSubmit

            }

          >

            {/* HEADER */}

            <div

              className="

              flex

              flex-col

              md:flex-row

              md:justify-between

              md:items-center

              gap-6

              mb-10

              "

            >

              <div>

                <h1

                  className="

                  text-4xl

                  font-bold

                  text-primary

                  "

                >

                  Edit Profile

                </h1>

                <p

                  className="

                  text-gray-500

                  mt-2

                  "

                >

                  Keep your information updated

                </p>

              </div>

            </div>

            {/* AVATAR */}

            <div

              className="

              flex

              justify-center

              mb-12

              "

            >

              <ProfileAvatar

                editable

                size="xl"

                value={

                  form.profileImageUrl

                }

                fullName={

                  form.fullName

                }

                onChange={(url)=>

                  setForm({

                    ...form,

                    profileImageUrl:

                    url,

                  })

                }

              />

            </div>

            {/* PERSONAL */}

            <h2

              className="

              text-2xl

              font-bold

              text-primary

              mb-6

              "

            >

              Personal Information

            </h2>

            <div

              className="

              grid

              md:grid-cols-2

              gap-6

              mb-10

              "

            >

              <InputField

                label="Full Name"

                value={

                  form.fullName

                }

                onChange={(v)=>

                  setForm({

                    ...form,

                    fullName:v,

                  })

                }

              />

              <InputField

                label="Phone Number"

                value={

                  form.phoneNumber

                }

                onChange={(v)=>

                  setForm({

                    ...form,

                    phoneNumber:v,

                  })

                }

              />

              <div>

                <label

                  className="

                  block

                  mb-2

                  font-medium

                  "

                >

                  Gender

                </label>

                <select

                  value={

                    form.gender

                  }

                  onChange={(e)=>

                    setForm({

                      ...form,

                      gender:

                      e.target.value,

                    })

                  }

                  className="

                  w-full

                  border

                  rounded-xl

                  px-4

                  py-3

                  "

                >

                  <option value="">

                    Select Gender

                  </option>

                  <option value="MALE">

                    Male

                  </option>

                  <option value="FEMALE">

                    Female

                  </option>

                </select>

              </div>

              <div>

                <label

                  className="

                  block

                  mb-2

                  font-medium

                  "

                >

                  Date Of Birth

                </label>

                <input

                  type="date"

                  value={

                    form.dateOfBirth

                  }

                  onChange={(e)=>

                    setForm({

                      ...form,

                      dateOfBirth:

                      e.target.value,

                    })

                  }

                  className="

                  w-full

                  border

                  rounded-xl

                  px-4

                  py-3

                  "

                />

              </div>

            </div>

            {/* BIO */}

            <div

              className="

              mb-10

              "

            >

              <label

                className="

                block

                mb-2

                font-medium

                "

              >

                Bio

              </label>

              <textarea

                rows="5"

                value={

                  form.bio

                }

                onChange={(e)=>

                  setForm({

                    ...form,

                    bio:

                    e.target.value,

                  })

                }

                className="

                w-full

                border

                rounded-xl

                px-4

                py-3

                "

              />

            </div>

            {/* STUDENT */}

            {

              profile.student && (

              <>

                <h2

                  className="

                  text-2xl

                  font-bold

                  text-primary

                  mb-6

                  "

                >

                  Academic Information

                </h2>

                <div

                  className="

                  mb-10

                  "

                >

                  <InputField

                    label="Academic Year"

                    value={

                      form.academicYear

                    }

                    onChange={(v)=>

                      setForm({

                        ...form,

                        academicYear:v,

                      })

                    }

                  />

                </div>

              </>

              )

            }

            {/* ORGANIZATION */}

            {

              profile.organization && (

              <>

                <h2

                  className="

                  text-2xl

                  font-bold

                  text-primary

                  mb-6

                  "

                >

                  Organization Information

                </h2>

                <div

                  className="

                  mb-10

                  "

                >

                  <InputField

                    label="Website URL"

                    value={

                      form.websiteUrl

                    }

                    onChange={(v)=>

                      setForm({

                        ...form,

                        websiteUrl:v,

                      })

                    }

                  />

                </div>

              </>

              )

            }

            {/* BUTTONS */}

            <div

              className="

              flex

              justify-end

              gap-4

              mt-10

              "

            >

              <button

                type="button"

                onClick={()=>

                  navigate(

                    "/profile"

                  )

                }

                className="

                border

                px-6

                py-3

                rounded-xl

                "

              >

                Cancel

              </button>

              <button

                disabled={saving}

                className="

                bg-primary

                hover:bg-secondary

                text-white

                px-8

                py-3

                rounded-xl

                transition

                "

              >

                {

                  saving

                  ?

                  "Saving..."

                  :

                  "Save Changes"

                }

              </button>

            </div>

          </form>

        </ProfileCard>

      </div>

    </DashboardLayout>

  );

}

function InputField({

  label,

  value,

  onChange,

}) {

  return (

    <div>

      <label

        className="

        block

        mb-2

        font-medium

        "

      >

        {label}

      </label>

      <input

        type="text"

        value={value}

        onChange={(e)=>

          onChange(

            e.target.value

          )

        }

        className="

        w-full

        border

        rounded-xl

        px-4

        py-3

        "

      />

    </div>

  );

}

export default EditProfilePage;