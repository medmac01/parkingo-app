import React from 'react'
import {Text as Txt , Circle , Path} from 'react-native-svg';
import {Text,RefreshControl,StyleSheet,View,TouchableWithoutFeedback, ScrollView, SafeAreaView} from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { PieChart, AreaChart, Grid } from 'react-native-svg-charts';
import moment from 'moment'; 

// import { 
//     Comfortaa_300Light,
//     Comfortaa_400Regular,
//     Comfortaa_500Medium,
//     Comfortaa_600SemiBold,
//     Comfortaa_700Bold 
//   } from '@expo-google-fonts/comfortaa';


import * as theme from '../theme'
import { Image } from 'react-native';

var mainData = require("../../data/spots.json");

//Refresh timeout






class PieChartWithCenteredLabels extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            refreshing: false
        };
    }
    
    _onRefresh = () => {
        console.log('refreshing')
        setTimeout(() => this.setState({ refreshing: false }), 3000);
        mainData = require("../../data/spots.json");
    }
    // Header
    renderHeader() {
        return (
          <View style={styles.header}>
            <Image style={styles.avatar} source={require('../assets/avatar.png')}></Image>
            <View style={{ flex: 1, justifyContent: "center" }}>
                  
              <Text style={styles.headerTitle}>

                  Welcome!</Text>
              <Text style={styles.headerUsername}>Agent 157</Text>
            </View>
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
            >
                <View style={{flex:1 , flexDirection:'row',alignItems:'center'}}>
                    <TouchableWithoutFeedback onPress = {console.log('logged out')}>
                        <Ionicons name="settings-outline" size={theme.SIZES.icon * 1.5} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress = {console.log('logged out')}>
                        <Ionicons name="log-out" size={theme.SIZES.icon * 1.5} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
          </View>
        );
      }

      

      // Main renderer

    render() {
         

        
        const data = [
            {
                key: 1,
                amount : mainData.parkings[0].free,
                svg : { fill : theme.COLORS.gray }
            },
            {
                key: 2,
                amount : mainData.parkings[0].capacity - mainData.parkings[0].free,
                svg : { fill : theme.COLORS.red }    
            },
            {
                key: 3,
                amount : mainData.parkings[0].pending,
                svg : { fill : theme.COLORS.yellow }    
            }
            
        ];
        const data2 = [
            {
                key: 1,
                amount : mainData.parkings[1].free,
                svg : { fill : theme.COLORS.gray }
            },
            {
                key: 2,
                amount : mainData.parkings[1].capacity - mainData.parkings[1].free,
                svg : { fill : theme.COLORS.red }    
            },
            {
                key: 3,
                amount : mainData.parkings[1].pending,
                svg : { fill : theme.COLORS.yellow }    
            }
            
        ];
        const data3 = [
            {
                key: 1,
                amount : mainData.parkings[2].free,
                svg : { fill : theme.COLORS.gray }
            },
            {
                key: 2,
                amount : mainData.parkings[2].capacity - mainData.parkings[2].free,
                svg : { fill : theme.COLORS.red }    
            },
            {
                key: 3,
                amount : mainData.parkings[2].pending,
                svg : { fill : theme.COLORS.yellow }    
            }
            
        ]

        const dailyReservations = [ 50, 10, 40, 95, 65, 102, 85, 91, 35, 53 ]

        var currentDate = moment().format("DD/MM/YYYY");
        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    
                    
                    <Txt
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.amount}
                    </Txt>
                )
            })
        }

        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
            <Circle
            key={ index }
            cx={ x(index) }
            cy={ y(value) }
            r={ 4 }
            stroke={ 'rgb(134, 65, 244)' }
            fill={ 'white' }
            />
            ))
        }


        const Line = ({ line }) => (
        <Path
        d={ line }
        stroke={ 'rgba(134, 65, 244)' }
        fill={ 'none' }
        />
        )
            

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}>
                        {this.renderHeader()}
                        <View style={styles.titleContainer}>
                            <Ionicons name="stats-chart" size={theme.SIZES.icon * 1.5} />
                            <Text style={styles.mainTitles}>
                                Current Stats:</Text>
                        </View>


                        <Text style={{color:theme.COLORS.concrete,paddingHorizontal: theme.SIZES.base * 2, paddingBottom: theme.SIZES.base * 1}}>
                            <Ionicons name="md-refresh-sharp" size={17} color={theme.COLORS.concrete} />
                            Updated : less than a minute ago</Text>

                        <View style={{flexDirection: "row",flex:1,paddingHorizontal:theme.SIZES.base * 2,paddingBottom: theme.SIZES.base * .1}}>
                             
                             <View style={{flexDirection: "row",flex:.5,paddingHorizontal:theme.SIZES.base * 0.5,paddingBottom: theme.SIZES.base * 1.5}}>
                                <MaterialIcons name="circle" color={theme.COLORS.red}size={theme.SIZES.icon * 1} />
                                <Text>Occupied</Text>
                             </View>
                             <View style={{flexDirection: "row",flex:.5,paddingHorizontal:theme.SIZES.base * 0.5,paddingBottom: theme.SIZES.base * 1.5}}>
                                <MaterialIcons name="circle" color={theme.COLORS.gray}size={theme.SIZES.icon * 1} />
                                <Text>Free</Text>
                             </View>
                             <View style={{flexDirection: "row",flex:.5,paddingHorizontal:theme.SIZES.base * 0.5,paddingBottom: theme.SIZES.base * 1.5}}>
                                <MaterialIcons name="circle" color={theme.COLORS.yellow}size={theme.SIZES.icon * 1} />
                                <Text>Pending</Text>
                             </View>


                        </View>
                        <View style={styles.graphContainer}>
                            <View style={styles.titleContainer}>
                                <Ionicons name="car" size={theme.SIZES.icon * 1.5} />
                                <Text style={styles.subTitles}>
                                    Presidence Parking:</Text>
                            </View>

                            <PieChart
                                style={{ height: 180 }}
                                valueAccessor={({ item }) => item.amount}
                                data={data}
                                spacing={0}
                            outerRadius={'95%'}
                            >
                                <Labels/>
                            </PieChart> 
                        </View>
                        <View style={styles.graphContainer}>
                            <View style={styles.titleContainer}>
                                <Ionicons name="car" size={theme.SIZES.icon * 1.5} />
                                <Text style={styles.subTitles}>
                                    Rear Parking:</Text>
                            </View>

                            <PieChart
                                style={{ height: 180 }}
                                valueAccessor={({ item }) => item.amount}
                                data={data2}
                                spacing={0}
                            outerRadius={'95%'}
                            >
                                <Labels/>
                            </PieChart> 
                        </View>
                        <View style={styles.graphContainer}>
                            <View style={styles.titleContainer}>
                                <Ionicons name="car" size={theme.SIZES.icon * 1.5} />
                                <Text style={styles.subTitles}>
                                    South Parking:</Text>
                            </View>

                            <PieChart
                                style={{ height: 180 }}
                                valueAccessor={({ item }) => item.amount}
                                data={data3}
                                spacing={0}
                            outerRadius={'95%'}
                            >
                                <Labels/>
                            </PieChart> 
                        </View>

                       


                        <View>
                            <View style={styles.titleContainer}>
                                <Ionicons name="pricetag" size={theme.SIZES.icon * 1.5} />    
                                <Text style={styles.mainTitles}>
                                Today's Reservations :</Text>
                            </View>

                            <Text style={{color:theme.COLORS.concrete,paddingHorizontal: theme.SIZES.base * 2.1, paddingBottom: theme.SIZES.base * 1}}>
                            <Ionicons name="calendar" size={17} color={theme.COLORS.concrete} />
                            {currentDate}</Text>

                            <AreaChart
                                style={styles.areachart}
                                data={ dailyReservations }
                                svg={{ fill: theme.COLORS.gray }}
                                contentInset={{ top: 20, bottom: 30 }}
                            >
                                <Grid/>
                                <Line/>
                                <Decorator/>
                            </AreaChart>

                        </View>
                        </ScrollView>
                        </SafeAreaView>

            </View>
            
        )
    }

}

export default PieChartWithCenteredLabels

const styles = StyleSheet.create({
    avatar: {
        flex:.27,
        margin: theme.SIZES.base,
        height: 40,
        width: 40,
        resizeMode: 'stretch'
    },
    areachart: {
        height: 200,
        paddingBottom: theme.SIZES.base * 2,
        paddingHorizontal: theme.SIZES.base * 2

    },
    mainTitles:{
        fontWeight:"bold",
        // fontFamily: "Comfortaa_700Bold",
        fontSize:30,
        paddingHorizontal: theme.SIZES.base * .5
    },
    subTitles:{
        fontSize:23,
        fontWeight:"bold",
        paddingHorizontal: theme.SIZES.base * .5
    },
    titleContainer: {
        flexDirection:"row",
        flex:1,
        paddingHorizontal:theme.SIZES.base * 2,
        paddingTop: theme.SIZES.base * .75,
        paddingBottom: theme.SIZES.base * .75,
        alignItems:'center' 
    },
    graphContainer: {
        margin:theme.SIZES.base,
        borderRadius:11,
        backgroundColor:theme.COLORS.white,
        padding:theme.SIZES.base/3

    },
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.clouds
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: theme.SIZES.base * 2,
        paddingTop: theme.SIZES.base * 2.5,
        paddingBottom: theme.SIZES.base * .5,
        backgroundColor: theme.COLORS.white,
    },
    headerTitle: {
        color: theme.COLORS.gray,
        fontSize:16
        
    },
    headerUsername: {
        fontSize: theme.SIZES.font * 1.25,
        fontWeight: "bold",
        paddingBottom: theme.SIZES.base / 3
    }
    }
)   