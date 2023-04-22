import { authModalState } from '@/atoms/authModalAtom';
import {
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay
} from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';


const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState)

    const handleClose = () => {
        setModalState(prev => ({
            ...prev,
            open: false,
        }))
    }

    return (
        <>
            <Modal isOpen={modalState.open} onClose={() => handleClose()}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {modalState.view === "login" && "Login"}
                        {modalState.view === "signup" && "SignUp"}
                        {modalState.view === "resetPassword" && "Reset Password"}

                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDirection="column"
                        alignItems="center" justifyContent="center"
                    >
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>
    )
}
export default AuthModal