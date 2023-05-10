import { auth, firestore } from '@/firebase/clientApp';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';


const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth)

    const CreateUserDocument = async (user: User) => {
        // Check if the doc already exits 
        const userDocRef = doc(firestore, "users", user.uid)
        await setDoc(userDocRef, JSON.parse(JSON.stringify(user)))
    }

    useEffect(() => {
        if (userCred) {
            CreateUserDocument(userCred.user)
        }
    }, [userCred])

    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth" mb={2}
                isLoading={loading}
                onClick={() => signInWithGoogle()}
            >
                <Image
                    src="/images/googlelogo.png"
                    height="20px" mr={4}
                />
                Continue with Google</Button>
            <Button> Some Other Provider</Button>
            {error && <Text> {error.message}</Text>
            }
        </Flex>
    )
}
export default OAuthButtons;