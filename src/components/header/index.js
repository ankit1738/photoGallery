import { Col, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";

import SearchBar from "./searchBar";
import {
    StyledHeader as Header,
    StyledCol as ColTop,
    StyledRow as RowTop,
    StyledHeading as Heading,
    StyledButton as Button,
} from "./styles";
function HeaderComponent() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <Header>
            <RowTop>
                <ColTop span={24}>
                    <Heading>Search Photos</Heading>
                    <Button onClick={() => setIsModalVisible(true)}>Features</Button>
                </ColTop>
                <ColTop span={24}>
                    <SearchBar />
                </ColTop>
            </RowTop>
            <Modal
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                ]}
                title="Implemented features"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleCancel}>
                <h2>Implemented Features</h2>
                <ul>
                    <li>Infinite scroll using Javascript's IntersectionObserver</li>
                    <li>Debouncing in search bar to minize api calls. Debouce time is 500ms</li>
                    <li>Suggestions in search bar using localstorage so that it persists even after closing tab</li>
                    <li>Default image display and text search</li>
                    <li>Dynamic sized Image modal</li>
                    <li>placeholders and loaders</li>
                </ul>
            </Modal>
        </Header>
    );
}

export default HeaderComponent;
