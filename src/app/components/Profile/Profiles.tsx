/* eslint-disable @next/next/no-img-element */
"use client";
import { useProfile, usePublication } from "@lens-protocol/react-web";
import React from "react";

interface Props {
  localname: string;
}

const Profiles: React.FC<Props> = ({ localname }) => {
  const { data: profile, error } = useProfile({
    forHandle: `lens/${localname}`,
  });

  return (
    <>
      {profile?.metadata?.picture?.__typename === "ImageSet" && (
        <>
          <div>
            <img
              src={
                profile.metadata.coverPicture?.__typename === "ImageSet"
                  ? profile.metadata.coverPicture.optimized?.uri
                  : ""
              }
              alt="Cover"
            />
          </div>
          <div>
            <img src={profile.metadata.picture.optimized?.uri} alt="Profile" />
          </div>
        </>
      )}
    </>
  );
};

export default Profiles;
