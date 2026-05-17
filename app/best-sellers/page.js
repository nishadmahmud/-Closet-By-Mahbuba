import CuratedCollectionPage from "@/components/CuratedCollectionPage/CuratedCollectionPage";

export const metadata = {
  title: "Best Sellers | Closet By Mahbuba",
  description: "Browse every best seller in one place.",
};

export default function BestSellersPage() {
  return <CuratedCollectionPage mode="best-sellers" />;
}
