import { AchievementList } from "../components/AchievementList";
import { api } from "../utils/api";

export default function Page() {
  const xd = api.achievement.getAll.useQuery();

  if (!xd.data) return <div>Loading..</div>;

  return <AchievementList list={xd.data} />;
}
