interface PointsProps {
  points: number;
}

export const Points = (props: PointsProps) => {
  return (
    <span className="grid min-w-[150px] place-content-center border-2 bg-brand-purple py-3 px-5 font-bold shadow-4-skew shadow-brand-black">
      🎉 {props.points} p
    </span>
  );
};
