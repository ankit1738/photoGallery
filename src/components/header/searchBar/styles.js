import styled from "styled-components";
import { Layout, Col, Row, Typography, AutoComplete, Input, Button } from "antd";

const { Header } = Layout;
const { Text } = Typography;

export const StyledHeading = styled(Text)`
    font-size: 3rem;
    color: white;
`;

export const StyledAutoComplete = styled(AutoComplete)`
    width: 500px;
`;

export const StyledInput = styled(Input)`
    /* width: 300px; */
    height: 35px;
`;

export const StyledColButton = styled(Col)``;

export const StyledRowButton = styled(Row)`
    justify-content: flex-end;
`;

export const StyledClearButton = styled(Button)`
    background-color: red;
    color: white;
    border-radius: 4px;
    width: 100px;
    height: 35px;
    :hover {
        background-color: red;
        color: white;
        border-radius: 4px;
    }
`;
