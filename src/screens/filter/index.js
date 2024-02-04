import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {event} from '../../event'

const Filter = (props) => {
    const {navigation, route} = props
    const {flightsData} = route?.params
    const [currentTab, setCurrentTab] = useState(0)

    const sortFlightList = (key) => {
        if(key === 0) {
            const sortedList = flightsData.sort((a, b) => a.fare - b.fare)
            event.emit('filter', sortedList)
        }
        else {
            const sortedList = flightsData.sort((a, b) => b.fare - a.fare)
            event.emit('filter', sortedList)
        }
    }
    const SortList = () => (
        <View style={{padding:10,marginVertical:10}}>
            <TouchableOpacity style={{padding:10}} onPress={() => sortFlightList(0)}>
                <Text>Low to High</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:10}} onPress={() => sortFlightList(1)}>
                <Text>High to Low</Text>
            </TouchableOpacity>
        </View>
    )
    const FilterListByAirline = () => (
        <View>
            <Text>TODO</Text>
        </View>
    )
    return(
        <View style={{flex:1, flexDirection:'row', backgroundColor:'white'}}>
            <View style={{width:'30%', backgroundColor:'#dddddd'}}>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={() => setCurrentTab(0)} style={[currentTab === 0 ? {backgroundColor:'#ed530c'}: null,{padding:5, alignItems:'center'}]}>
                        <Text style={[currentTab === 0 ? {color:'#FFFFFF', fontWeight:'500'}: {color:'#444444'}]}>Sort by Price</Text>
                    </TouchableOpacity>
                    <View style={{padding:5, alignItems:'center'}}>
                        <Text style={{color:'#000000', fontSize:18, fontWeight:'500'}}>Filter</Text>
                    </View>
                    <TouchableOpacity onPress={() => setCurrentTab(1)} style={[currentTab === 1 ? {backgroundColor:'#ed530c'}: null,{padding:5, alignItems:'center'}]}>
                        <Text style={[currentTab === 1 ? {color:'#FFFFFF', fontWeight:'500'}: {color:'#444444'}]}>Airlines</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.pop()} style={{padding:10, alignItems:'center', backgroundColor:'#498bf5'}}>
                    <Text style={{color:'#FFFFFF', fontSize:16, fontWeight:'500'}}>DONE</Text>
                </TouchableOpacity>
            </View>
            <View>
                {
                    currentTab === 0 ? <SortList />: null
                }
                {
                    currentTab === 1 ? <FilterListByAirline />: null
                }
            </View>
        </View>
    )
}

export default Filter