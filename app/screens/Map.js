import React, { Component , useState } from "react";
import {
  Image,
  Alert,
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import MapView from "react-native-maps";
import Modal from "react-native-modal";
import Dropdown from "react-native-modal-dropdown";
import { FontAwesome,FontAwesome5, Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
// import CSVReader from 'react-csv-reader';
import * as Notifications from 'expo-notifications';

import * as theme from "../theme";
import { color } from "react-native-reanimated";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const { Marker } = MapView;
const { height, width } = Dimensions.get("screen");
const input = require("../../data/spots.json");

const parkingsSpots = [
  {
    id: 1,
    title: "Presidence Parking",
    price: 5,
    rating: input.parkings[0].rating,
    spots: input.parkings[0].capacity,
    free: input.parkings[0].free,
    pending: input.parkings[0].pending,
    coordinate: {
      latitude: 34.045114,
      longitude: -5.063227
    },
    description: `Entrée 1`
  },
  {
    id: 2,
    title: "Rear Parking",
    price: 7,
    rating: input.parkings[1].rating,
    spots: input.parkings[1].capacity,
    free: input.parkings[1].free,
    pending: input.parkings[1].pending,
    coordinate: {
      latitude: 34.046813,
      longitude: -5.066030
    },
    description: `Entrée 1, 2`
  },
  {
    id: 3,
    title: "South Parking",
    price: 10,
    rating: input.parkings[2].rating,
    spots: input.parkings[2].capacity,
    free: input.parkings[2].free,
    pending: input.parkings[2].pending,
    coordinate: {
      latitude: 34.044515,
      longitude: -5.068023
    },
    description: `Entrée 2`
  }
];


class ParkingMap extends Component {




  _onRefresh = () => {
    console.log('refreshing')
    setTimeout(() => this.setState({ refreshing: false }), 3000);
    mainData = require("../../data/spots.json");
  }

  state = {
    hours: {},
    active: null,
    activeModal: null
  };

  UNSAFE_componentWillMount() {
    const { parkings } = this.props;
    const hours = {};

    parkings.map(parking => {
      hours[parking.id] = 1;
    });

    this.setState({ hours });
  }

  handleHours = (id, value) => {
    const { hours } = this.state;
    hours[id] = value;

    this.setState({ hours });
  };

  renderHeader() {
    return (
      <View style={styles.header}>
          <Image style={styles.avatar} source={require('../assets/avatar.jpg')}></Image>
          <View style={{ flex: 1, justifyContent: "center" }}>
                
            <Text style={styles.headerTitle}>

                Welcome!</Text>
            <Text style={styles.headerUsername}>User</Text>
            <Text>
            <MaterialIcons name="location-pin" size={16} color={theme.COLORS.gray} />
              Euromed University of Fez</Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
          >
              <View style={{flex:1 , flexDirection:'row',alignItems:'center'}}>
                  <TouchableNativeFeedback onPress = {this._onRefresh()}>
                      <Ionicons name="md-refresh-sharp" size={theme.SIZES.icon * 1.5} />
                  </TouchableNativeFeedback>
                  <TouchableWithoutFeedback>
                      <Ionicons name="log-out" size={theme.SIZES.icon * 1.5} />
                  </TouchableWithoutFeedback>
              </View>
          </View>
      </View>
    );
  }

  renderParking = item => {
    const { hours } = this.state;
    const totalPrice = item.price * hours[item.id];

    return (
      <TouchableWithoutFeedback
        key={`parking-${item.id}`}
        onPress={() => this.setState({ active: item.id })}
      >
        <View style={[styles.parking, styles.shadow]}>
          <View style={styles.hours}>
            <Text style={styles.hoursTitle}>
            <FontAwesome5 name="parking" size={theme.SIZES.font} color={theme.COLORS.red} />
              {" "}
              {item.title}
            </Text>
            <Text style={styles.pendingTitle}>
            <FontAwesome5 name="fire" size={theme.SIZES.text} color={theme.COLORS.yellow} />
              {" "}
              {item.pending} are pending reservation.
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {this.renderHours(item.id)}
              <Text style={{ color: theme.COLORS.gray }}>hrs</Text>
            </View>
          </View>
          <View style={styles.parkingInfoContainer}>
            <View style={styles.parkingInfo}>
              <View style={styles.parkingIcon}>
                <Ionicons
                  name="ios-car"
                  size={theme.SIZES.icon * 1.2}
                  color={theme.COLORS.gray}
                />
                <Text style={{ marginLeft: theme.SIZES.base }}>
                  {" "}
                  {item.free}/{item.spots}
                </Text>
              </View>
              <View style={styles.parkingIcon}>
                
                <MaterialCommunityIcons
                name="cctv"
                size={theme.SIZES.icon * 1.3}
                color={theme.COLORS.gray}
              />
              <MaterialCommunityIcons
                name="bike"
                size={theme.SIZES.icon * 1.2}
                color={theme.COLORS.gray}
              />
              <MaterialIcons 
              name="accessible" 
              size={theme.SIZES.icon * 1.3} 
              color={theme.COLORS.gray} 
              />

                
              </View>
            </View>
            <TouchableOpacity
              style={styles.buy}
              onPress={() => this.setState({ activeModal: item })}
            >
              <View style={styles.buyTotal}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* <FontAwesome
                    name="pricetag"
                    size={theme.SIZES.icon * 1.25}
                    color={theme.COLORS.white}
                  /> */}
                  <Text style={styles.buyTotalPrice}>Go</Text>
                </View>
                
              </View>
              <View style={styles.buyBtn}>
                <FontAwesome
                  name="angle-right"
                  size={theme.SIZES.icon * 1.75}
                  color={theme.COLORS.white}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderParkings = () => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.parkings}
        data={this.props.parkings}
        extraData={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => this.renderParking(item)}
      />
    );
  };

  renderHours(id) {
    const { hours } = this.state;
    const availableHours = [1, 2, 3, 4, 5, 6];

    return (
      <Dropdown
        defaultIndex={0}
        options={availableHours}
        style={styles.hoursDropdown}
        defaultValue={`0${hours[id]}:00` || "01:00"}
        dropdownStyle={styles.hoursDropdownStyle}
        onSelect={(index, value) => this.handleHours(id, value)}
        renderRow={option => (
          <Text style={styles.hoursDropdownOption}>{`0${option}:00`}</Text>
        )}
        renderButtonText={option => `0${option}:00`}
      />
    );
  }

  displayEV (props) {
    console.log("function called");
    if (props === 1) { 
      console.log("WELLAH ILA KHEDDAM -_-");
      return (
      <Text
        style={{
          color: theme.COLORS.gray,
          fontSize: theme.SIZES.font * .9
        }}
      >
        <MaterialIcons name="electric-scooter" size={theme.SIZES.base * 1.4} color={theme.COLORS.gray} />
        {" "}
        {"EV Charger Available"}
      </Text> 
  );           
  }
}

createTwoButtonAlert = () =>
    Alert.alert(
      "Success",
      `Your spot is reserved , and it will be valid for the next 30 min
Your spot number is : 117
      `,
      [
        {
          text: "Cancel Reservation",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

// You might need to remove this.
//   ModalTester() {
//     const [isModalVisible, setModalVisible] = useState(false);
    
//     const toggleModal = () => {
//       setModalVisible(!isModalVisible);
//   };

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//     return (
//       <View style={{flex: 1}}>
//         <Button title="Show modal" onPress={toggleModal} />

//         <Modal isVisible={isModalVisible}>
//           <View style={{flex: 1}}>
//             <Text>Hello!</Text>

//             <Button title="Hide modal" onPress={toggleModal} />
//           </View>
//         </Modal>
//       </View>
//     );
// }

  renderModal() {
    const { activeModal, hours } = this.state;

    if (!activeModal) return null;

    return (
      <Modal
        isVisible
        useNativeDriver
        style={styles.modalContainer}
        backdropColor={theme.COLORS.overlay}
        onBackButtonPress={() => this.setState({ activeModal: null })}
        onBackdropPress={() => this.setState({ activeModal: null })}
        onSwipeComplete={() => this.setState({ activeModal: null })}
      >
        <View style={styles.modal}>
          <View>
            
            <Text style={{ fontSize: theme.SIZES.font * 1.5, fontWeight: "bold" }}>
              <FontAwesome5 name="parking" size={theme.SIZES.font * 1.5} color={theme.COLORS.red} />
              {" "}
              {activeModal.title}
            </Text>
          </View>
          <View style={{ paddingVertical: theme.SIZES.base }}>

            <Text
              style={{
                color: theme.COLORS.concrete,
                fontSize: theme.SIZES.font * 1.1
              }}
            >
              <Ionicons name="ios-location-outline" size={theme.SIZES.base * 1.4} color={theme.COLORS.concrete} />
              {" "}
              {activeModal.description}
            </Text>
          </View>
           <View style={{ paddingBottom: theme.SIZES.base }}>           
            {this.displayEV(activeModal.id)}
          </View>
          

          
          

          <View style={styles.modalInfo}>
            <View
              style={[styles.parkingIcon, { justifyContent: "flex-start" }]}
            >
              <MaterialCommunityIcons
                name="cctv"
                size={theme.SIZES.icon * 1.3}
                color={theme.COLORS.gray}
              />
              {/* <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {" "}
                24/7
              </Text> */}
            </View>

            <View
              style={[styles.parkingIcon, { justifyContent: "flex-start" }]}
            >
              <Ionicons
                name="ios-star"
                size={theme.SIZES.icon * 1.1}
                color={theme.COLORS.gray}
              />
              {/* <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {" "}
                {activeModal.rating}
              </Text> */}
            </View>

            <View
              style={[styles.parkingIcon, { justifyContent: "flex-start" }]}
            >
              <MaterialCommunityIcons
                name="bike"
                size={theme.SIZES.icon * 1.2}
                color={theme.COLORS.gray}
              />
              {/* <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {" "}
                {activeModal.rating}
              </Text> */}
            </View>

            <View
              style={[styles.parkingIcon, { justifyContent: "flex-start" }]}
            >
              <MaterialIcons name="accessible" size={theme.SIZES.icon * 1.3} color={theme.COLORS.gray} />

              {/* <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {" "}
                {activeModal.price}km
              </Text> */}
            </View>
            <View
              style={[styles.parkingIcon, { justifyContent: "flex-start" }]}
            >
              <Ionicons name="car" size={theme.SIZES.icon * 1.3} color={theme.COLORS.gray} />
              
              <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {" "}
                {activeModal.free}/{activeModal.spots}
              </Text>
            </View>
          </View>
          <View style={styles.modalHours}>
            <Text style={{ textAlign: "center", fontWeight: "500" }}>
              <Ionicons name={'time'} size={theme.SIZES.base * 1.2} color={theme.COLORS.white} />
              {" "}
              Choose your Booking Period:
            </Text>
            <View style={styles.modalHoursDropdown}>
              {this.renderHours(activeModal.id)}
              <Text style={{ color: theme.COLORS.gray }}>hrs</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.payBtn} onPress={this.createTwoButtonAlert}>
              <Text style={styles.payText}>
              {/* <FontAwesome5 name="times-circle" size={theme.SIZES.base * 1.5} color="white" /> */}
                {/* {" "} */}
                Confirm Reservation
              </Text>
              <FontAwesome
                name="angle-right"
                size={theme.SIZES.icon * 1.75}
                color={theme.COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { currentPosition, parkings } = this.props;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView initialRegion={currentPosition} style={styles.map} mapType="standard">
          {parkings.map(parking => (
            <Marker
              key={`marker-${parking.id}`}
              coordinate={parking.coordinate}
            >
              <TouchableWithoutFeedback
                onPress={() => this.setState({ active: parking.id })}
              >
                <View
                  style={[
                    styles.marker,
                    styles.shadow,
                    this.state.active === parking.id ? styles.active : null
                  ]}
                >
                  <Text style={styles.markerPrice}>P{parking.id}</Text>
                  <Text style={styles.markerStatus}>
                    {" "}
                    ({parking.free}/{parking.spots})
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Marker>
          ))}
        </MapView>
        {this.renderParkings()}
        {this.renderModal()}
      </View>
    );
  }
}

ParkingMap.defaultProps = {
  currentPosition: {
    latitude: 34.045385,
    longitude: -5.065339,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121
  },
  parkings: parkingsSpots
};

export default ParkingMap;

const styles = StyleSheet.create({
  avatar: {
    flex:.27,
    margin: theme.SIZES.base,
    height: 40,
    width: 40,
    // resizeMode: 'stretch'
},
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.white
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: theme.SIZES.base * 2,
    paddingTop: theme.SIZES.base * 2.5,
    paddingBottom: theme.SIZES.base * 1.5
  },
  headerTitle: {
    color: theme.COLORS.gray,
    fontSize:16
  },
  headerUsername: {
    fontSize: theme.SIZES.font * 1.25,
    fontWeight: "bold",
    paddingBottom: theme.SIZES.base / 3
  },
  map: {
    flex: 3
  },
  parkings: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: theme.SIZES.base * 2
  },
  parking: {
    flexDirection: "row",
    backgroundColor: theme.COLORS.white,
    borderRadius: 6,
    padding: theme.SIZES.base,
    marginHorizontal: theme.SIZES.base * 2,
    width: width - 24 * 2
  },
  buy: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: theme.SIZES.base,
    paddingVertical: theme.SIZES.base,
    backgroundColor: theme.COLORS.red,
    borderRadius: 6
  },
  buyTotal: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  buyTotalPrice: {
    color: theme.COLORS.white,
    fontSize: theme.SIZES.base * 2,
    fontWeight: "600",
    paddingLeft: theme.SIZES.base / 4
  },
  buyBtn: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  marker: {
    flexDirection: "row",
    backgroundColor: theme.COLORS.white,
    borderRadius: theme.SIZES.base * 2,
    paddingVertical: 12,
    paddingHorizontal: theme.SIZES.base * 2,
    borderWidth: 1,
    borderColor: theme.COLORS.white
  },
  markerPrice: { color: theme.COLORS.red, fontWeight: "bold" },
  markerStatus: { color: theme.COLORS.gray },
  shadow: {
    shadowColor: theme.COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  active: {
    borderColor: theme.COLORS.red
  },
  hours: {
    flex: 1,
    flexDirection: "column",
    marginLeft: theme.SIZES.base / 2,
    justifyContent: "space-evenly"
  },
  hoursTitle: {
    fontSize: theme.SIZES.text,
    fontWeight: "bold",
  },
  pendingTitle: {
    fontSize: theme.SIZES.text,
    fontWeight: "500",
    color : theme.COLORS.yellow,
    paddingVertical: theme.SIZES.base 
  },
  hoursDropdown: {
    borderRadius: theme.SIZES.base / 2,
    borderColor: theme.COLORS.overlay,
    borderWidth: 1,
    padding: theme.SIZES.base,
    marginRight: theme.SIZES.base / 2
  },
  hoursDropdownOption: {
    padding: 5,
    fontSize: theme.SIZES.font * 0.8
  },
  hoursDropdownStyle: {
    marginLeft: -theme.SIZES.base,
    paddingHorizontal: theme.SIZES.base / 2,
    marginVertical: -(theme.SIZES.base + 1)
  },
  parkingInfoContainer: { flex: 1.5, flexDirection: "row" },
  parkingInfo: {
    justifyContent: "space-evenly",
    marginHorizontal: theme.SIZES.base * 1.5
  },
  parkingIcon: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end"
  },
  modal: {
    flexDirection: "column",
    height: height * 0.75,
    padding: theme.SIZES.base * 2,
    backgroundColor: theme.COLORS.white,
    borderTopLeftRadius: theme.SIZES.base,
    borderTopRightRadius: theme.SIZES.base
  },
  modalInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: theme.SIZES.base,
    backgroundColor: theme.COLORS.clouds,
    borderRadius: 10
  },
  modalHours: {
    paddingVertical: height * 0.11
  },
  modalHoursDropdown: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.SIZES.base
  },
  payBtn: {
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.SIZES.base * 1.5,
    backgroundColor: theme.COLORS.red
  },
  payText: {
    fontWeight: "600",
    fontSize: theme.SIZES.base * 1.5,
    color: theme.COLORS.white
  }
});
