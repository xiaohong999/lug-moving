/*global gtag*/
import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../layouts/Header";
import { Container, Grid, Box, Button } from "@material-ui/core";
import LocationField from "../components/LocationField";
import Footer from "../layouts/Footer";
import { locationSelected, serviceSelected } from "../redux/actions";
import { SERVICES } from "../utils";

const styles = {
    header: {
        background: "var(--colorMain)",
    },
    coverImage: {
        maxWidth: "100%",
        display: "block",
        padding: "20px 0",
        margin: "auto",
    },
};

class Landing extends Component {
    constructor(props) {
        super(props);

        let service = null;
        if (props.match.params.id) {
            switch (props.match.params.id) {
                case "marketplace":
                    service = SERVICES[1];
                    break;
                case "urgent-delivery":
                    service = SERVICES[2];
                    break;
                case "one-man-van":
                    service = SERVICES[3];
                    break;
                case "two-man-truck":
                    service = SERVICES[4];
                    break;
                case "small-move":
                    service = SERVICES[5];
                    break;
                default:
                    service = SERVICES[0];
                    break;
            }
            props.serviceSelected(service);
        } else {
            service = SERVICES[0];
        }

        this.state = {
            pickup: null,
            destination: null,
            service: service,
        };
    }

    componentDidMount = () => {
        gtag("js", new Date());
        gtag("config", "UA-156726482-1");
        if (window.fbq != null) {
            window.fbq("track", "PageView");
        }
    };

    pickupSelected = (data) => {
        this.setState({
            pickup: data,
        });
    };

    destinationSelected = (data) => {
        this.setState({
            destination: data,
        });
    };

    onClickEstimate = () => {
        const { pickup, destination } = this.state;
        this.props.locationSelected({
            pickup: pickup,
            destination: destination,
            distance: 0,
        });
        this.props.history.push("/book/location");
    };

    render() {
        const { service } = this.state;

        return (
            <div>
                <Box style={styles.header}>
                    <Header />
                </Box>
                <img src="/images/landing-cover.png" style={styles.coverImage} alt="" />
                <Container maxWidth="md">
                    <Box paddingY={3}>
                        <Box className="service-title">{service.title}</Box>
                        <Box color="#888" paddingY={2}>
                            {service.description}
                        </Box>
                    </Box>
                    <Grid container>
                        {service.steps.map((step, index) => (
                            <Grid md={4} xs={12} item key={index}>
                                <Box padding={2}>
                                    <Box marginX="auto">
                                        <img src={step.icon} alt="" className="service-step-image" />
                                    </Box>
                                    <Box paddingBottom={2} fontSize={20} fontWeight={600}>
                                        {step.title}
                                    </Box>
                                    <Box color="#888">{step.description}</Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Box marginY={3}>
                        <Grid container className="location-panel">
                            <Grid item sm={5} xs={12} style={{ paddingRight: 20 }}>
                                <LocationField direction={0} placeSelected={this.pickupSelected} />
                            </Grid>
                            <Grid item sm={5} xs={12} style={{ paddingRight: 20 }}>
                                <LocationField direction={1} placeSelected={this.destinationSelected} />
                            </Grid>
                            <Grid item sm={2} xs={12}>
                                <Button
                                    fullWidth
                                    className="lug-btn"
                                    style={{
                                        marginTop: 8,
                                    }}
                                    onClick={this.onClickEstimate}
                                >
                                    Get estimate
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <Box padding={3}>
                    <div className="embedsocial-reviews" data-ref="72ed31d504ff1743a0925a64badd591d0b9f922f"></div>
                </Box>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedService: state.selectedService,
});

const mapDispatchToProps = (dispatch) => ({
    serviceSelected: (service) => dispatch(serviceSelected(service)),
    locationSelected: (location) => dispatch(locationSelected(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
