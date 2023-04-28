import { auth, firestore } from '@/firebase/clientApp';
import { Box, Button, Checkbox, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import { doc, getDoc, serverTimestamp, setDoc } from '@firebase/firestore';
import { runTransaction } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
    const [user] = useAuthState(auth)
    const [communityName, setCommunityName] = useState('')
    const [charsRemaining, setCharsRemaing] = useState(21)
    const [communityType, setCommunityType] = useState('public')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) return
        setCommunityName(event.target.value)
        setCharsRemaing(21 - event.target.value.length)
    }

    const onCommunityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(event.target.name)
    }

    const handleCreateCommunity = async () => {
        if (error) setError("")

        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (format.test(communityName) || communityName.length < 3) {
            throw new Error("Community names must be between 3-21 characters, and can only contain letters, numbers or underscores")
        }
        setLoading(true)

        try {

            const communityDocRef = doc(firestore, 'communities', communityName)

            await runTransaction(firestore, async (transaction) => {
                const communityDoc = await transaction.get(communityDocRef)
                if (communityDoc.exists()) {
                    throw new Error(`Sorry, r/${communityName} is already taken. Try another. `)
                }

                // Create the community
                transaction.set(communityDocRef, {
                    creatorId: user?.uid,
                    cratedAt: serverTimestamp(),
                    numberOfMembers: 1,
                    privacyType: communityType,
                })
                transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
                    communityId: communityName,
                    isModerator: true
                })
            })

        } catch (error: any) {
            console.log("HandleCreateCommunity Error", error)
            setError(error.message)

        }
        setLoading(false)
        // validate the community name






        //Check that name is not taken
        //is valid name create
    }


    return (
        <Modal isOpen={open} onClose={handleClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader display="flex" flexDirection="column" fontSize={15} padding={3}>Create a Community</ModalHeader>
                <Box pl={3} pr={3}>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDirection="column" padding="10px 8px" >
                        <Text fontWeight={600} fontSize={15}>
                            Name
                        </Text>
                        <Text color="gray.500" fontSize={11}>
                            Community names including capitalization cannot be changed
                        </Text>
                        <Text color="gray.400" fontSize={11}
                            position="relative" top="28px" left="10px" width="20px"
                        >
                            r/
                        </Text>
                        <Input
                            position="relative"
                            value={communityName} size="sm" pl="22px" onChange={handleChange} />
                        <Text
                            color={charsRemaining === 0 ? "red" : "gray.500"}
                        > {charsRemaining}Character remaining</Text>
                        <Text fontSize="9pt" color="red" pt={1}>{error}</Text>
                        <Box mt={4} mb={4}>
                            <Text fontWeight={600} fontSize={15} mb={2}>Community Type </Text>
                            <Stack spacing={2}>
                                <Checkbox name="public" isChecked={communityType === "public"} onChange={onCommunityTypeChange}>
                                    <Flex align="center" >
                                        <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                                        <Text fontSize="10pt" mr={1}>
                                            Public
                                        </Text>
                                        <Text fontSize={8} color="gray.500" pl={1}>
                                            Anyone can view or comment in this community
                                        </Text>
                                    </Flex>
                                </Checkbox>
                                <Checkbox name="restricted" isChecked={communityType === "restricted"} onChange={onCommunityTypeChange}>
                                    <Flex align="center" >
                                        <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                                        <Text fontSize="10pt" mr={1}>
                                            Restricted
                                        </Text>
                                        <Text fontSize={8} color="gray.500" pl={1}>
                                            Anyone can view this community but only approved users can post
                                        </Text>
                                    </Flex>
                                </Checkbox>
                                <Checkbox name="private" isChecked={communityType === "private"} onChange={onCommunityTypeChange}>
                                    <Flex align="center" >
                                        <Icon as={HiLockClosed} color="gray.500" mr={2} />
                                        <Text fontSize="10pt" mr={1}>
                                            Private
                                        </Text>
                                        <Text fontSize={8} color="gray.500" pl={1}>
                                            Only approved can view or submit to this community
                                        </Text>
                                    </Flex>
                                </Checkbox>
                            </Stack>
                        </Box>

                    </ModalBody>
                </Box>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='ghost' onClick={handleCreateCommunity} isLoading={loading}>
                        Create Community
                    </Button>
                </ModalFooter>
            </ModalContent >
        </Modal >
    )
}
export default CreateCommunityModal;