import { useSubscribeToPosts } from "@/hooks/usePosts";

const RealtimeSubscription = () => {
  useSubscribeToPosts();
  return null;
};

export default RealtimeSubscription;
