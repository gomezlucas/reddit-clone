import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil'

export interface CommunityType {
    id: string;
    creatorId: string;
    numberOfMembers: number;
    privacyType: 'public' | 'restricted' | 'private';
    createdAt?: Timestamp;
    imageUrl?: string;
}