import React from "react";
import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";

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
    return <div>Community does not exist</div>;
  }

  return <div>Welcome to {getData?.communityData.id} </div>;
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
