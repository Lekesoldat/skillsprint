import { AchievementList } from "../components/AchievementList";
import { Spinner } from "../components/ui/loaders/Spinner";
import { api } from "../utils/api";

export default function Page() {
  const xd = api.achievement.getAll.useQuery();

  if (!xd.data) return <Spinner />;

  return (
    <div className="w-full">
      <AchievementList list={xd.data} />
    </div>
  );
}
