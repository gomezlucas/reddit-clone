import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import {
    Box,
    Button,
    Icon,
    Input,
    Stack,
    Textarea,
    Image,
} from "@chakra-ui/react";
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';

type NewPostFormProps = {

};

const formTabs: TabItemIcon[] = [
    {
        title: "Post",
        icon: IoDocumentText,
    },
    {
        title: "Images & Video",
        icon: IoImageOutline,
    },
    {
        title: "Link",
        icon: BsLink45Deg,
    },
    {
        title: "Poll",
        icon: BiPoll,
    },
    {
        title: "Talk",
        icon: BsMic,
    },
];

export type TabItemIcon = {
    title: string,
    icon: typeof Icon.arguments;

}

const NewPostForm: React.FC<NewPostFormProps> = () => {
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title)
    const [textInputs, setTextInputs] = useState({
        title: '',
        body: ''
    })

    const [selectedFile, setSelectedFile] = useState<string>()

    const handleCreatePost = async () => { }

    const onSelectedImage = () => { }

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target: { name, value } } = event
        setTextInputs(prev => ({ ...prev, [name]: value }))

    }
    console.log(textInputs)
    return (
        <Flex direction='column' bg='white' borderRadius={4} mt={2}>
            <Flex width='100%'>
                {formTabs.map(item => {
                    return (
                        <>
                            <TabItem item={item} selected={item.title === selectedTab} setSelected={setSelectedTab} />
                        </>
                    )
                })}
            </Flex>
            <Flex>
                {selectedTab === 'Post' && (
                    <TextInputs
                        textInputs={textInputs}
                        handleCreatePost={handleCreatePost}
                        onChange={onTextChange}
                        loading={false}
                    />

                )}
            </Flex>

        </Flex>)
}
export default NewPostForm;