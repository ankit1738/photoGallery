import styled from "styled-components";
import { Layout, Col, Row, Typography, AutoComplete, Input, Button } from "antd";

const { Header } = Layout;
const { Text } = Typography;
export const StyledHeader = styled(Header)`
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 150px;
`;

export const StyledCol = styled(Col)`
    display: flex;
    justify-content: center;
`;

export const StyledRow = styled(Row)``;

export const StyledHeading = styled(Text)`
    line-height: 2;
    font-size: calc(100% + 2vw);
    color: white;
`;

export const StyledButton = styled(Button)`
    position: absolute;
    right: 0;
    top: 50%;
`;
