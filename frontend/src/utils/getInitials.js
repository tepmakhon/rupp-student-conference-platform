export default function getInitials(name = "") {
  return name

    .split(" ")

    .map((word) => word[0])

    .join("")

    .slice(0, 2)

    .toUpperCase();
}
