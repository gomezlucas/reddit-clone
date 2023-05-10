import { Input, Stack, Textarea, Flex, Button } from '@chakra-ui/react';
import React from 'react';

type TextInputsProps = {
    textInputs: {
        title: string;
        body: string;
    };
    onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleCreatePost: () => void;
    loading: boolean;
}

    ;

const TextInputs: React.FC<TextInputsProps> = ({ textInputs, onChange, handleCreatePost, loading }) => {

    return (
        <Stack spacing={3} width='100%'>
            <Input
                name='title'
                value={textInputs.title}
                onChange={onChange}
                fontSize='10pt'
                borderRadius={4}
                placeholder='Title'
                _placeholder={{ color: 'gray.500' }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'black'
                }}
            />
            <Textarea
                name='body'
                value={textInputs.body}
                onChange={onChange}
                placeholder='Text (optional)'
                fontSize='10pt'
                height='100px'
                borderRadius={4}
                _placeholder={{ color: 'gray.500' }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'black'
                }}
            />
            <Flex justify='flex-end'>
                <Button
                    height='34px'
                    padding='0px 30px'
                    disabled={false}
                    onClick={() => { }}
                >
                    Post
                </Button>
            </Flex>

        </Stack>
    )
}
export default TextInputs;