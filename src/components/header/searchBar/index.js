import React, { useContext, useState, useEffect } from "react";
import {
    StyledAutoComplete as AutoComplete,
    StyledInput as Input,
    StyledRowButton as RowButton,
    StyledColButton as ColButton,
    StyledClearButton as ClearButton,
} from "./styles";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import axios from "axios";
import { Context } from "../../../App";
import { PHOTO_SEARCH, DEFAULT_URL } from "../../../apiConstants";
function SearchBar() {
    const { photos, setPhotos } = useContext(Context);
    const [options, setOptions] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);

    /** calling default url in the beginning  */
    useEffect(() => {
        axios.get(`${DEFAULT_URL}&page=1`).then((res) => {
            console.log(res.data);
            setPhotos(res.data.photos.photo);
            localStorage.setItem("isDefaultScreen", true);
            localStorage.setItem("page2", 2);
            localStorage.removeItem("searchText");
            const suggestions = JSON.parse(localStorage.getItem("suggestions") || "[]");
            if (suggestions.length > 0) {
                setOptions(suggestions);
            }
        });
    }, []);

    /** Debounce function to minimize the api request */
    const debounce = (func, delay) => {
        let debounceTimer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const onSearch = debounce(function (searchText) {
        setLoadingSearch(true);
        console.log(searchText.length);
        if (searchText.length > 0) {
            const url = `${PHOTO_SEARCH}&text=${searchText}&per_page=10&page=1`;
            axios.get(url).then((res) => {
                console.log(res.data);
                setPhotos(res.data.photos.photo);
                const suggestions = JSON.parse(localStorage.getItem("suggestions") || "[]");
                console.log(suggestions);
                suggestions.unshift({ value: searchText });
                suggestions.length = suggestions.length > 5 ? 5 : suggestions.length;
                localStorage.setItem("suggestions", JSON.stringify(suggestions));
                setOptions(suggestions);
                localStorage.setItem("isDefaultScreen", false);
                localStorage.setItem("isDefaultScreen", false);
                localStorage.setItem("searchText", searchText);
                localStorage.setItem("page1", 2);
                window.scrollTo(0, 0);
            });
            setLoadingSearch(false);
        } else {
            // setOptions([]);
            setLoadingSearch(false);
        }
    }, 500);

    const clear = () => {
        localStorage.setItem("suggestions", JSON.stringify([{}]));
        setOptions([]);
    };

    const search = () => {
        console.log("here");
    };

    return (
        <>
            <AutoComplete
                loading={loadingSearch}
                children={<Input suffix={<SearchOutlined onClick={search} style={{ color: "rgba(0,0,0,.45)" }} />} />}
                options={options}
                dropdownRender={(data) => (
                    <>
                        {data}
                        <RowButton>
                            <ColButton>
                                <ClearButton onClick={clear}>Clear</ClearButton>
                            </ColButton>
                        </RowButton>
                    </>
                )}
                notFoundContent={loadingSearch ? <Spin /> : "No Data"}
                onSearch={onSearch}
                onSelect={onSearch}></AutoComplete>
        </>
    );
}

export default SearchBar;
