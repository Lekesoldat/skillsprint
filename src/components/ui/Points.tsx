interface PointsProps {
  points: number;
}

export const Points = (props: PointsProps) => {
  return (
    <span className="grid min-w-[150px] place-content-center border-2 border-brand-black bg-brand-purple py-3 px-5 font-bold shadow-4-right shadow-brand-black">
      🎉 {props.points} p
    </span>
  );
};
