import AuthShowcase from "../components/AuthShowcase";
import { Button } from "../components/ui/Button";
import { useToast } from "../hooks/use-toast";

export default function Page() {
  const { toast } = useToast();
  return (
    <div className="flex w-full flex-col justify-center">
      <AuthShowcase />
    </div>
  );
}
