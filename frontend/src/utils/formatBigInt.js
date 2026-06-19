export default function formatBigInt(

  value

) {

  if (

    value === null ||

    value === undefined

  ) {

    return "";

  }

  return String(

    value

  );

}