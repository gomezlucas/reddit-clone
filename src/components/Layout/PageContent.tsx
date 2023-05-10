import { Flex } from '@chakra-ui/react';
import React from 'react';

type PageContentProps = {
    children: any
};

const PageContent: React.FC<PageContentProps> = ({ children }) => (
    <Flex justify="center" p="16px 0px" border="1px solid red">
        <Flex
            width="95%"
            justify="center"
            maxWidth="860px"
         >
            
            {/* Left Side */}
            <Flex direction="column" width={{ base: "100%", md: "65%" }}
                mr={{ base: 0, md: 6 }}
             >
                {children && children[0 as keyof typeof children]}
            </Flex>

            {/* Right Side */}
            <Flex direction="column"
                border="1px solid orange"
                display={{ base: "none", md: "flex" }}
                flexGrow={1}
            >
                {children && children[1 as keyof typeof children]}
            </Flex>
        </Flex>
    </Flex>
)
export default PageContent;