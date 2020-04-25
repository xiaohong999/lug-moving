import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { Box } from "@material-ui/core";
import Popover, { ArrowContainer } from "react-tiny-popover";
import { SERVICES } from "../utils";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseClass: "",
            isServicesPopup: false,
            isMobile: false,
            serviceExpended: false,
            services: SERVICES.slice(1),
        };
        console.log(this.state.services);
    }

    componentDidMount = () => {
        this.handleWindowResize();
        window.addEventListener("resize", this.handleWindowResize);
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    handleWindowResize = () => {
        this.setState({ isMobile: window.innerWidth <= 600 });
    };

    onClickService = (service) => {
        const { isMobile, services } = this.state;
        if (!service) {
            if (isMobile) {
                return;
            }
            service = services[0];
        }
        if (isMobile) {
            this.setState({
                collapseClass: "",
                serviceExpended: false,
            });
        } else {
            this.setState({ isServicesPopup: false });
        }
        window.location.href = `/service/${service.link}`;
    };

    setToggleTopMenuClass = () => {
        if (this.state.collapseClass === "") {
            this.setState({
                collapseClass: "collapsed",
            });
        } else {
            this.setState({
                collapseClass: "",
                serviceExpended: false,
            });
        }
    };

    render = () => {
        const { services, isServicesPopup, collapseClass, isMobile, serviceExpended } = this.state;

        let serviceMenus = (
            <Box padding={2} className="my-popover" onMouseLeave={() => this.setState({ isServicesPopup: false })}>
                {services.map((service) => (
                    <Box key={service.id} className="item" onClick={() => this.onClickService(service)}>
                        {service.name}
                    </Box>
                ))}
            </Box>
        );

        let serviceElem = isMobile ? (
            <Box style={{ padding: 0 }}>
                <Box
                    style={{ display: "flex", justifyContent: "space-between", padding: "10px 10px 10px 20px" }}
                    onClick={() => {
                        this.setState({ serviceExpended: !serviceExpended });
                    }}
                >
                    <a href="#" onClick={() => this.onClickService(null)}>
                        Services
                    </a>
                    {serviceExpended ? <IoIosArrowUp color="white" size={20} /> : <IoIosArrowDown color="white" />}
                </Box>
                {serviceExpended && serviceMenus}
            </Box>
        ) : (
            <Popover
                isOpen={isServicesPopup}
                position={"bottom"}
                padding={0}
                onClickOutside={() => this.setState({ isServicesPopup: false })}
                content={({ position, targetRect, popoverRect }) => (
                    <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                        position={position}
                        targetRect={targetRect}
                        popoverRect={popoverRect}
                        arrowColor={"#2c2b54"}
                        arrowSize={10}
                    >
                        {serviceMenus}
                    </ArrowContainer>
                )}
            >
                <a href="#" onClick={() => this.onClickService(null)} onMouseEnter={() => this.setState({ isServicesPopup: true })}>
                    Services
                </a>
            </Popover>
        );

        return (
            <div>
                <div className={`top-menu ${collapseClass}`}>
                    <div className="top-menu-lead">
                        <Link to="/">
                            <img src="/images/logo.png" alt="logo" />
                        </Link>
                    </div>
                    <div className="menu">
                        {serviceElem}
                        <Link to="/how">How it works</Link>
                        <a href="/book" className="book">
                            Book now
                        </a>
                    </div>
                    {collapseClass.length > 0 ? (
                        <MdClose className="top-menu-icon" onClick={this.setToggleTopMenuClass} />
                    ) : (
                        <MdMenu className="top-menu-icon" onClick={this.setToggleTopMenuClass} />
                    )}
                </div>
            </div>
        );
    };
}
