//@ts-nocheck

"use client";

import { apolloClient } from "@/app/helpers/client";
import {
  ExplorePublicationsOrderByType,
  useExplorePublications,
} from "@lens-protocol/react-web";

import { UpdateIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Markdown from "react-markdown";

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
          <UpdateIcon className="animate-spin size-12 invert" />
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen">
      <div className="flex justify-center">
        <div className="w-[35vw] space-y-5">
          {publications?.map((publication) => (
            <Card>
              <CardHeader>
                <CardTitle key={publication.id} className="h-3/4">
                  {publication.by.handle?.localName}
                  <div className="text-gray-600 font-extralight text-sm">
                    @{publication.by.handle?.fullHandle}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  className=""
                  src={
                    publication.__typename === "Post" || "Quote"
                      ? publication.metadata?.asset?.image?.optimized.uri
                      : ""
                  }
                />
                <Markdown className="mt-4 break-words">
                  {publication.metadata?.content?.replace(
                    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
                    // "[LINK]($1)"
                  )}
                </Markdown>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Publication;
