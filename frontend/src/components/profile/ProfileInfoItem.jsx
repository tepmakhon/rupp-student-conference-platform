function ProfileInfoItem({

  label,

  value,

}) {

  return (

    <div>

      <p

        className="

        text-sm

        font-medium

        text-gray-500

        mb-1

        "

      >

        {label}

      </p>

      <p

        className="

        text-lg

        font-semibold

        text-gray-800

        break-words

        "

      >

        {

          value ||

          "-"

        }

      </p>

    </div>

  );

}

export default ProfileInfoItem;