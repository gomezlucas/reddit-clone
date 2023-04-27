import { Box, Button, Checkbox, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
    const [communityName, setCommunityName] = useState('')
    const [charsRemaining, setCharsRemaing] = useState(21)
    const [communityType, setCommunityType] = useState('public')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) return
        setCommunityName(event.target.value)
        setCharsRemaing(21 - event.target.value.length)
    }

    const onCommunityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(event.target.name)
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
                    <Button variant='ghost'>
                        Create Community
                    </Button>
                </ModalFooter>
            </ModalContent >
        </Modal >
    )
}
export default CreateCommunityModal;