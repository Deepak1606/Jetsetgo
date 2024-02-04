import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {event} from '../../event'

const Search = props => {
    const { navigation, route } = props;
    const { searchKey, data, eventName } = route?.params;

    const [searchList, setSearchList] = useState([]);

    const findAirports = () => {
        const list = data?.map(item => {
            return {
                ...item?.displayData?.[searchKey]?.airport
            };
        });
        jsonObjectofAirports = list.map(JSON.stringify);
        uniqueSet = new Set(jsonObjectofAirports);
        uniqueArrayofAirports = Array.from(uniqueSet).map(JSON.parse);
        setSearchList(uniqueArrayofAirports);
    };

    const pickedAirport = (item) => {
        console.log(item)
        const airport = {
            key: searchKey,
            value: item
        }
        event.emit(eventName, airport)
        navigation.goBack()
    }
    const _renderAirportList = ({item, index}) => (
        <TouchableOpacity onPress={() => pickedAirport(item)} style={{backgroundColor:'#e3e1e1', padding:10, borderRadius:5, minHeight:60, justifyContent:'center'}}>
            <View style={{flexDirection:'row'}}>
                <View style={{paddingHorizontal:5, justifyContent:'center'}}>
                <MaterialIcons 
                name="local-airport"
                size={24}
                />
                </View>
                <View style={{paddingHorizontal:5}}>
                    <Text style={{color:'#544f4f', fontSize:20}}>{item?.airportName}{'\t'}{`(${item?.airportCode})`}</Text>
                    <Text style={{color:'#888888', fontSize:16}}>{item?.countryName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    const _separator = ({item, index}) => (
        <View style={{marginVertical:5}} />
    )

    const _header = () => (
        <View style={{justifyContent:'center', alignItems:'center', marginVertical:10, padding:10}}>
            <Text style={{color:'#544f4f', fontSize:20}}>Choose your {searchKey}</Text>
        </View>
    )
    useEffect(() => {
        findAirports();
    }, []);
    return (
        <SafeAreaView>
            <View style={{ padding: 10 }}>
                <FlatList 
                data={searchList}
                renderItem={_renderAirportList}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={_separator}
                ListHeaderComponent={_header}
                />
            </View>
        </SafeAreaView>
    );
};

export default Search;
