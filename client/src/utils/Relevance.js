import { FaStar } from "react-icons/fa";

const createArray = (length) => [...Array(length)];
const Star = ({ selected = false, onSelect }) => (
  <FaStar color={selected ? "yellow" : "gray"} onClick={onSelect} />
);

const StarRating = ({ totalStars, selected }) => {
  return createArray(totalStars).map((n, i) => (
    <Star key={i} selected={selected > i} />
  ));
};

export default StarRating;