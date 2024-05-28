"use client";

import { apolloClient } from "@/app/helpers/client";
import {
  ExplorePublicationsOrderByType,
  useExplorePublications,
} from "@lens-protocol/react-web";

import { UpdateIcon } from "@radix-ui/react-icons";
import {} from "@lens-protocol/metadata";

const Publication = () => {
  let {
    data: publications,
    loading,
    error,
  } = useExplorePublications({
    orderBy: ExplorePublicationsOrderByType.Latest,
  });

  publications = publications?.filter((p: any) => {
    if (p.metadata && p.metadata.asset) {
      if (p.metadata.asset.image) return true;
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-w-full h-screen flex justify-center items-center">
        <div>
          <UpdateIcon className="animate-spin size-12" />
        </div>
      </div>
    );
  }

  return (
    <main className="w-fit min-h-screen">
      <div className="flex justify-center items-center flex-col">
        {publications?.map((publication) => (
          <div key={publication.id} className="h-3/4 flex justify-center">
            {publication.by.handle?.fullHandle}
            <img
              className="w-1/3"
              src={
                publication.__typename === "Post"
                  ? publication.metadata?.asset?.image?.optimized.uri
                  : ""
              }
            />
            <div>
              {publication.metadata?.content?.replace(
                /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
                "[LINK]($1)"
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Publication;
