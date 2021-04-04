import React from 'react'
import {Text as Txt , Circle , Path} from 'react-native-svg';
import {Text,RefreshControl,StyleSheet,View,TouchableWithoutFeedback, ScrollView, SafeAreaView} from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { PieChart, AreaChart, Grid } from 'react-native-svg-charts'


import * as theme from '../theme'

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
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.headerTitle}>
                  <FontAwesome name="user-circle" color={theme.COLORS.gray} style={{paddingHorizontal: theme.SIZES.base /3}} />

                  Logged in as:</Text>
              <Text style={styles.headerLocation}>Agent 157</Text>
            </View>
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
            >
              <TouchableWithoutFeedback>
                <Ionicons name="log-out" size={theme.SIZES.icon * 1.5} />
              </TouchableWithoutFeedback>
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
                        <Text style={styles.mainTitles}>
                            <Ionicons name="stats-chart" size={theme.SIZES.icon * 1.5} />
                            Current Stats:</Text>

                        <View style={{flexDirection: "row",flex:1,paddingHorizontal:theme.SIZES.base * 2,paddingBottom: theme.SIZES.base * 1.5}}>
                             
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
                        <Text style={{
                            fontSize:27,
                            paddingHorizontal: theme.SIZES.base * 2,
                            paddingBottom: theme.SIZES.base * 1.5
                        }}>
                            <Ionicons name="car" size={theme.SIZES.icon * 1.5} />
                            Presidence Parking:</Text>
                        <PieChart
                            style={{ height: 200 }}
                            valueAccessor={({ item }) => item.amount}
                            data={data}
                            spacing={0}
                        outerRadius={'95%'}
                        >
                            <Labels/>
                        </PieChart> 


                        <Text style={{
                            fontSize:30,
                            paddingHorizontal: theme.SIZES.base * 2,
                            paddingBottom: theme.SIZES.base * 1.5
                        
                        }}>
                            <Ionicons name="car" size={theme.SIZES.icon * 1.5} />
                            Rear Parking:</Text>
                        <PieChart
                            style={{ height: 200 }}
                            valueAccessor={({ item }) => item.amount}
                            data={data2}
                            spacing={0}
                        outerRadius={'95%'}
                        >
                            <Labels/>
                        </PieChart>

                        <Text style={{
                            fontSize:30,
                            paddingHorizontal: theme.SIZES.base * 2,
                            paddingBottom: theme.SIZES.base * 1.5
                        
                        }}
                        >
                            <Ionicons name="car" size={theme.SIZES.icon * 1.5} />
                            South Parking:</Text>
                        <PieChart
                            style={{ height: 200,paddingBottom:theme.SIZES.base * 1.5 }}
                            valueAccessor={({ item }) => item.amount}
                            data={data3}
                            spacing={0}
                        outerRadius={'95%'}
                        >
                            <Labels/>
                        </PieChart>


                        <View>
                            <Text style={styles.mainTitles}>
                            <Ionicons name="calendar" size={theme.SIZES.icon * 1.5} />    
                            Today's Reservations :</Text>

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
    areachart: {
        height: 200,
        paddingBottom: theme.SIZES.base * 2,
        paddingHorizontal: theme.SIZES.base * 2

    },
    mainTitles:{
        fontWeight:"bold",
        fontSize:30,
        paddingHorizontal: theme.SIZES.base * 2,
        paddingBottom: theme.SIZES.base * 1.5
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
        
    },
    headerLocation: {
        fontSize: theme.SIZES.font,
        fontWeight: "500",
        paddingVertical: theme.SIZES.base / 3
    }
    }
)   