import { Row, Col } from "antd";
import Modal from "antd/lib/modal/Modal";
import styled from "styled-components";

export const StyledRow = styled(Row)`
    /* justify-content: center; */
`;

export const StyledCol = styled(Col)`
    justify-content: center;
    display: flex;
    margin: 1rem 0;
`;

export const StyledImg = styled.img`
    height: 400px;
    width: 400px;
    object-fit: cover;
    cursor: pointer;
`;

export const StyledImg2 = styled.img`
    /* object-fit: cover; */
    cursor: pointer;
`;

// export const StyledModal = styled(Modal)`
//     width: fit-content;
//     height: fit-content;
// `;
