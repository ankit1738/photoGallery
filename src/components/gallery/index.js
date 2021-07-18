import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
import { Context } from "../../App";
import { StyledCol as Col, StyledRow as Row, StyledImg, StyledImg2 } from "./styles";
import axios from "axios";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { GET_PHOTO, DEFAULT_URL, PHOTO_SEARCH } from "../../apiConstants";
import Modal from "antd/lib/modal/Modal";
function Gallery() {
    const { photos } = useContext(Context);
    const [gallery, setGallery] = useState([]);
    const [page1, setPage1] = useState(2);
    const [page2, setPage2] = useState(2);
    const [isDefaultScreen, setIsDefaultScreen] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loadingIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState("");
    useEffect(() => {
        console.log("Rendring Gallery", photos);
        setGallery(photos);
    }, [photos]);

    useEffect(() => {
        setIsDefaultScreen(localStorage.getItem("isDefaultScreen"));
        // setSearchTextLocal();
    }, []);

    /** Intersection Observer for infintie scroll */
    const observer = useRef();
    const lastElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(handleObserver, {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            });
            if (node) observer.current.observe(node);
        },
        [loading]
    );

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting && hasMore) {
            let url;
            setLoading(true);
            console.log(isDefaultScreen);
            if (isDefaultScreen) {
                url = `${DEFAULT_URL}&page=${localStorage.getItem("page2")}`;
            } else {
                url = `${PHOTO_SEARCH}&text=${localStorage.getItem(
                    "searchText"
                )}&per_page=10&page=${localStorage.getItem("page1")}`;
            }
            axios
                .get(url)
                .then((res) => {
                    setGallery(gallery.concat(res.data.photos.photo));
                    isDefaultScreen
                        ? localStorage.setItem("page2", res.data.photos.page + 1)
                        : localStorage.setItem("page1", res.data.photos.page + 1);
                    if (res.data.photos.perpage * res.data.photos.page > res.data.photos.page.total) {
                        setHasMore(false);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("Error", err);
                    setLoading(false);
                });
        }
    };
    const openModal = (data) => {
        setIsModalVisible(true);
        setCurrentImage(`${GET_PHOTO}${data.server}/${data.id}_${data.secret}_z.jpg`);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <div style={{ height: "150px" }}></div>
            <Row>
                {gallery?.map((data, index) => (
                    <Col key={data.id} xs={24} sm={24} md={12} lg={12} xl={8}>
                        {index + 1 === gallery.length ? (
                            <StyledImg
                                onClick={() => openModal(data)}
                                ref={lastElementRef}
                                src={`${GET_PHOTO}${data.server}/${data.id}_${data.secret}_w.jpg`}
                                alt={data.title}
                            />
                        ) : (
                            <StyledImg
                                onClick={() => openModal(data)}
                                src={`${GET_PHOTO}${data.server}/${data.id}_${data.secret}_w.jpg`}
                                alt={data.title}
                            />
                        )}
                    </Col>
                ))}
            </Row>
            <Row justify="center">
                <Col>
                    <Spin size="large" spinning={loading} indicator={loadingIcon} />
                </Col>
            </Row>
            <Modal
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                ]}
                title="Photo"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleCancel}>
                <StyledImg2 src={currentImage} />
            </Modal>
        </>
    );
}

export default Gallery;
