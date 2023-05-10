import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil'

export interface Community  {
    id: string;
    creatorId: string;
    numberOfMembers: number;
    privacyType: 'public' | 'restricted' | 'private';
    createdAt?: Timestamp;
    imageUrl?: string;
}


export interface CommnitySnippet {
    communityId: string;
    isModerator?: boolean;
    imageURL?: string;
}


interface CommunityState {
    mySnippets: CommnitySnippet[]
    // visitedCommunities: 
}

const defaultCommunityState: CommunityState = {
    mySnippets: []
}

export const communityState  = atom<CommunityState>({
    key: 'communitiesState',
    default: defaultCommunityState
})