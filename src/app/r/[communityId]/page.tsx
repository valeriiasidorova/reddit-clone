import React from "react";
import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "@/app/components/Community/NotFound";
import Header from "@/app/components/Community/Header";
import PageLayout from "@/app/components/Community/layout";
import CreatePostLink from "@/app/components/Community/CreatePostLink";

type CommunityPageProps = {
  communityData: Community; // atom
};

export default async function CommunityPage({
  params,
}: {
  params: { communityId: string };
}) {
  const getData = await getCommunityData(params.communityId);

  if (!getData) {
    return <NotFound />;
  }

  return (
    <>
      <Header communityData={getData.communityData} />
      <PageLayout>
        <>
          <CreatePostLink />
        </>
        <>
          <div>Right Side Content</div>
          <div>Right Side Content</div>
          <div>Right Side Content</div>
          <div>Right Side Content</div>
        </>
      </PageLayout>
    </>
  );
}

export async function getCommunityData(communityName: string) {
  try {
    const communityDocRef = doc(firestore, "communities", communityName);
    const communityDoc = await getDoc(communityDocRef); // get a doc snapshot of a specific community
    const data: CommunityPageProps = {
      communityData: JSON.parse(
        safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
      ),
    };
    return communityDoc.exists() ? data : "";
  } catch (error) {
    console.log("getCommunityData error", error);
  }
}
