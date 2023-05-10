import { CommunityType } from '@/atoms/communitiesAtom';
import CreatePostLink from '@/components/Community/CreatePostLink';
import Header from '@/components/Community/Header';
import NotFound from '@/components/Community/NotFound';
import PageContent from '@/components/Layout/PageContent';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';



type communityPageProps = {
    communityData: CommunityType
};

const CommunityPage: React.FC<communityPageProps> = ({ communityData }) => {

    if (!communityData) {
        return (
            <NotFound />
        )
    }

    return (
        <>
            <Header communityData={communityData} />
            <PageContent>
                <><CreatePostLink /></>
                <><div>Rigth</div></>
            </PageContent>
        </>
    )

    return (
        <>{communityData && communityData.id}</>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {


    try {
        const communityDocRef = doc(
            firestore,
            'communities',
            context.query.communityId as string)

        const communityDoc = await getDoc(communityDocRef)
        return {
            props: {
                communityData: communityDoc.exists() ?
                    JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }))
                    :
                    ""
            }
        }
    } catch (error) {
        // Error Page Here
        console.log("getServerSideProps Error", error)
    }



}



export default CommunityPage;


