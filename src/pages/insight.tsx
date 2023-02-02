import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export default function Page() {
  return (
    <>
      <Button variant="shadow">This is a button</Button>
      <Badge text={"This is a badge"} color="red" />
    </>
  );
}
