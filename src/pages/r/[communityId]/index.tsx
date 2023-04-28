import { CommunityType } from '@/atoms/communitiesAtom';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';

type communityPageProps = {
    communityData: CommunityType
};

const CommunityPage: React.FC<communityPageProps> = () => {

    return (
        <>holisss</>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const communityDocRef = doc(firestore, 'communities', context.query.commmunityId as string)
        const communityDoc = await getDoc(communityDocRef)

        return {
            props: {
                communityData: communityDoc.data()
            }
        }
    } catch (error) {
        // Error Page Here
        console.log("getServerSideProps Error", error)
    }

    return {
        props: {}
    }
}



export default CommunityPage;


