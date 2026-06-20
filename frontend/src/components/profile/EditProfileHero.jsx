import {

  PencilSquareIcon,

} from "@heroicons/react/24/outline";

function EditProfileHero() {

  return (

    <div

      className="

        bg-white

        rounded-3xl

        shadow-sm

        border

        p-8

      "

    >

      <div

        className="

          flex

          items-center

          gap-5

        "

      >

        <div

          className="

            w-16

            h-16

            rounded-2xl

            bg-primary/10

            flex

            items-center

            justify-center

          "

        >

          <PencilSquareIcon

            className="

              w-8

              h-8

              text-primary

            "

          />

        </div>

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

            Keep your account information updated.

          </p>

        </div>

      </div>

    </div>

  );

}

export default EditProfileHero;