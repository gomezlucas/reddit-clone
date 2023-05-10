import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Community, communityState } from '../atoms/communitiesAtom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, doc, getDocs, increment } from 'firebase/firestore';
import { CommnitySnippet } from '@/atoms/communitiesAtom'
import { writeBatch } from 'firebase/firestore'
import { authModalState } from '@/atoms/authModalAtom';


const useCommunityData = () => {
    const [user] = useAuthState(auth)
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState)
    const setAuthModalState = useSetRecoilState(authModalState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        // is the user signed in? 

        // if not => open auth modal
        if (!user) {
            setAuthModalState({ open: true, view: 'login' })
            return
        }

        setLoading(true)
        if (isJoined) {
            leaveCommunity(communityData.id)
            return
        }

        joinCommunity(communityData)
    }

    const joinCommunity = (communityData: Community) => {
        try {
            // creating a new community snnipet
            const batch = writeBatch(firestore)
            const newSnippet: CommnitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageUrl || ""
            }
            batch.set(
                doc(firestore,
                    `users/${user?.uid}/communitySnippets`,
                    communityData.id),
                newSnippet)

            //updating the number of members(+1)
            batch.update(doc(firestore, 'communities', communityData.id), {
                numberOfMembers: increment(1),
            })

            batch.commit()
            // update recoil state - communityState.mySnippets
            setCommunityStateValue(prev => ({
                ...prev, mySnippets: [...prev.mySnippets, newSnippet]
            }))

            setLoading(false)
        } catch (error: any) {
            console.log("joinCommunity Error", error)
            setError(error.message)

        }

    }
    const leaveCommunity = (communityId: string) => {
        // deleting a new community snnipet from  user

        //updating the number of members (-1)

        // update recoil state - communityState.mySnippets

        try {

            const batch = writeBatch(firestore)

            batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId))

            batch.update(doc(firestore, 'communities', communityId), {
                numberOfMembers: increment(-1),
            })

            batch.commit()

            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(item => item.communityId !== communityId)
            }))

        } catch (error: any) {
            console.log('leaveCommunity Error', error.message)
            setError(error)
        }
        setLoading(false)
    }

    const getMySnippets = async () => {
        setLoading(true)
        try {
            //get user Snippets
            console.log(user?.uid, 'the user id is')
            const snippetsDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`))

            const snippets = snippetsDocs.docs.map(doc => ({ ...doc.data() }))
            console.log(snippets, 'the snippets are')
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: snippets as CommnitySnippet[]  // Array<CommunitySnippet>
            }))

        } catch (error: any) {
            console.log("getMySnippets Error", error)
            setError(error.message)
        }
        setLoading(false)
    }


    useEffect(() => {
        console.log('entro a getMySnippets')
        if (!user) return
        getMySnippets()
    }, [user])

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading
    }
}
export default useCommunityData;