import CuratedCollectionPage from "@/components/CuratedCollectionPage/CuratedCollectionPage";

export const metadata = {
  title: "New Arrivals | Closet By Mahbuba",
  description: "Browse every new arrival in one place.",
};

export default function NewArrivalsPage() {
  return <CuratedCollectionPage mode="new-arrivals" />;
}
