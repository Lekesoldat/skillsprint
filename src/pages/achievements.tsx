import { AchievementList } from "../components/AchievementList";
import { Loader } from "../components/ui/Loader";
import { api } from "../utils/api";

export default function Page() {
  const xd = api.achievement.getAll.useQuery();

  if (!xd.data) return <Loader />;

  return (
    <div className="w-full">
      <AchievementList list={xd.data} />
    </div>
  );
}
