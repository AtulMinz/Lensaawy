/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
//@ts-nocheck
"use client";

import {
  ExplorePublicationsOrderByType,
  useExplorePublications,
} from "@lens-protocol/react-web";

import { UpdateIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Markdown from "react-markdown";
import { Suspense } from "react";
import Link from "next/link";

const Publication = ({}) => {
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
            <Card
              key={publication.id}
              className="bg-neutral-850 border-[1px] border-white"
            >
              <CardHeader>
                <CardTitle className="h-3/4 space-x-1">
                  <span className="text-gray-300">
                    {publication.by.handle?.localName}
                  </span>
                  <Link
                    href={"#"}
                    className="text-gray-600 font-extralight text-sm"
                  >
                    @{publication.by.handle?.fullHandle}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center">
                  <Suspense fallback={<ReloadIcon />}>
                    <img
                      className="rounded-sm"
                      src={
                        publication.__typename === "Post" || "Quote"
                          ? publication.metadata?.asset?.image?.optimized.uri
                          : ""
                      }
                    />
                  </Suspense>
                </div>
                <CardDescription className="flex">
                  <Markdown className="mt-4 break-words">
                    {publication.metadata?.content?.replace(
                      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
                      // "[LINK]($1)"
                    )}
                  </Markdown>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Publication;
