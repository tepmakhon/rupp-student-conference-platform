import {

  useRef,

  useState,

} from "react";

import {

  FaCamera,

} from "react-icons/fa";

import toast

from "react-hot-toast";

import {
  uploadToCloudinary,
} from "../../utils/cloudinaryUpload";

function ProfileAvatar({

  value,

  fullName,

  editable = false,

  size = "lg",

  onChange,

}) {

  const fileInputRef =

  useRef(null);

  const [

    uploading,

    setUploading,

  ] = useState(false);

  const sizeClasses = {

    sm:

    "w-16 h-16",

    md:

    "w-24 h-24",

    lg:

    "w-36 h-36",

    xl:

    "w-44 h-44",

  };

  const buttonClasses = {

    sm:

    "w-8 h-8",

    md:

    "w-10 h-10",

    lg:

    "w-12 h-12",

    xl:

    "w-14 h-14",

  };

  const avatar =

    value ||

    `https://ui-avatars.com/api/?background=0F4C3A&color=fff&size=300&name=${encodeURIComponent(

      fullName ||

      "User"

    )}`;

  const handleUpload =

  async (e) => {

    try {

      const file =

      e.target.files[0];

      if (!file) {

        return;

      }

      setUploading(

        true

      );

      const imageUrl =

      await uploadToCloudinary(

        file

      );

      onChange?.(

        imageUrl

      );

      toast.success(

        "Image uploaded"

      );

    }

    catch(error){

      console.error(error);

      toast.error(

        error.message ||

        "Upload failed"

      );

    }

    finally{

      setUploading(

        false

      );

    }

  };

  return (

    <div

      className="

      flex

      flex-col

      items-center

      "

    >

      <div

        className="

        relative

        "

      >

        <img

          src={avatar}

          alt="profile"

          className={`

            rounded-full

            object-cover

            border-4

            border-primary

            ${

              sizeClasses[size]

            }

          `}

        />

        {

          editable && (

          <>

            <button

              type="button"

              onClick={()=>

                fileInputRef

                .current

                .click()

              }

              className={`

                absolute

                bottom-1

                right-1

                rounded-full

                bg-primary

                hover:bg-secondary

                text-white

                flex

                items-center

                justify-center

                shadow-lg

                ${

                  buttonClasses[size]

                }

              `}

            >

              <FaCamera />

            </button>

            <input

              ref={

                fileInputRef

              }

              type="file"

              accept="image/*"

              hidden

              onChange={

                handleUpload

              }

            />

          </>

          )

        }

      </div>

      {

        uploading && (

        <p

          className="

          text-sm

          text-primary

          mt-3

          "

        >

          Uploading...

        </p>

        )

      }

    </div>

  );

}

export default ProfileAvatar;