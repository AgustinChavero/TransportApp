import RatingStar from "./RatingStar";

export interface RatingStarsProps {
  onClickFunction: Function;
  stateValue: number;
}

export default function RatingStars({ onClickFunction, stateValue }: RatingStarsProps) {
  const enableColor = "#FEBC0B";
  const disabledColor = "gray";
  return (
    <div className="mb-4 flex  w-2/3 items-center justify-center ">
      <label htmlFor="q1" onClick={() => onClickFunction(1)}>
        <RatingStar
          title="1"
          className="w-10 cursor-pointer"
          color={stateValue >= 1 ? enableColor : disabledColor}
        />
      </label>
      <input id="q1" type="radio" value={1} className="hidden" />

      <label htmlFor="q2" onClick={() => onClickFunction(2)}>
        <RatingStar
          title="2"
          className="w-10  cursor-pointer"
          color={stateValue >= 2 ? enableColor : disabledColor}
        />
      </label>

      <input id="q2" type="radio" value={2} className="hidden" />
      <label htmlFor="q3" onClick={() => onClickFunction(3)}>
        <RatingStar
          title="3"
          className="w-10 cursor-pointer"
          color={stateValue >= 3 ? enableColor : disabledColor}
        />
      </label>
      <input id="q3" type="radio" value={3} className="hidden" />

      <label htmlFor="q4" onClick={() => onClickFunction(4)}>
        <RatingStar
          title="4"
          className="w-10 cursor-pointer"
          color={stateValue >= 4 ? enableColor : disabledColor}
        />
      </label>
      <input id="q4" type="radio" value={4} className="hidden" />

      <label htmlFor="q5" onClick={() => onClickFunction(5)}>
        <RatingStar
          title="5"
          className="w-10 cursor-pointer"
          color={stateValue >= 5 ? enableColor : disabledColor}
        />
      </label>
      <input id="q5" type="radio" value={5} className="hidden" />
    </div>
  );
}
