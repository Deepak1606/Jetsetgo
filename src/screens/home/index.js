import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, Text, useColorScheme, View, TouchableOpacity, FlatList } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { useEvent } from '../../event/EventProvider';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = props => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1
    };

    const event = useEvent();
    const [dataFromApi, setDataFromApi] = useState([]);
    const [departureCity, setDeparturecity] = useState();
    const [arrivalCity, setArrivalcity] = useState();
    const [allFlightsData, setAllFlightsData] = useState([])
    const [flightsData, setFlightsData] = useState(allFlightsData);
    const [refreshList, setRefreshList] = useState(false)

    useEffect(() => {
        apiCall();
    }, []);

    useEffect(() => {
        event.on('search', setValueFromDropDown);

        return () => {
            event.off('search', setValueFromDropDown);
        };
    }, [setValueFromDropDown]);

    useEffect(() => {
        event.on('filter', setValueFromFilter);
        return () => {
            event.off('filter', setValueFromFilter);
        };
    }, [setValueFromFilter]);

    const setValueFromDropDown = data => {
        if (data.key == 'source') {
            setDeparturecity(prev => data.value);
        } else if (data.key == 'destination') {
            setArrivalcity(prev => data.value);
        }
    };

    const setValueFromFilter = data => {
        setRefreshList(prev => !prev)
        setFlightsData(prev => data)
    }

    const apiCall = async () => {
        fetch('https://api.npoint.io/4829d4ab0e96bfab50e7')
            .then(resp => resp.json())
            .then(data => setDataFromApi(prev => data?.data?.result))
            .catch(error => console.log(error));
    };

    const searchData = key => () => {
        props.navigation.push('Search', {
            searchKey: key,
            data: dataFromApi,
            eventName: 'search'
        });
    };

    const searchAllflights = () => {
        const query = query => {
            return (
                query?.displayData?.source?.airport?.airportCode === departureCity?.airportCode &&
                query?.displayData?.destination?.airport?.airportCode === arrivalCity?.airportCode
            );
        };
        const flights = dataFromApi?.filter(query);
        setAllFlightsData(prev => flights);
        setFlightsData(prev => flights)
    };
    const isDiasbledSearch = !(departureCity && arrivalCity);
    console.log(refreshList)
    const SearchBar = () => {
        return (
            <View style={{ padding: 10, backgroundColor: '#498bf5' }}>
                <TouchableOpacity
                    onPress={searchData('source')}
                    style={{
                        justifyContent: 'center',
                        padding: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#dddddd',
                        marginVertical: 5
                    }}>
                    <Text style={{ paddingHorizontal: 10, color: '#ffffff' }}>
                        {departureCity
                            ? `${departureCity?.airportName}\t(${departureCity?.airportCode})`
                            : 'Pick your origin'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={searchData('destination')}
                    style={{
                        justifyContent: 'center',
                        padding: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#dddddd',
                        marginVertical: 5
                    }}>
                    <Text style={{ paddingHorizontal: 10, color: '#ffffff' }}>
                        {arrivalCity
                            ? `${arrivalCity?.airportName}\t(${arrivalCity?.airportCode})`
                            : 'Pick your destination'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        borderRadius: 5,
                        marginVertical: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: isDiasbledSearch ? '#c4c7cc' : '#ff7744'
                    }}
                    disabled={isDiasbledSearch}
                    onPress={searchAllflights}>
                    <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '500' }}>SEARCH</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _renderCard = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                padding: 10,
                borderColor: '#dddddd',
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: '#eeeeee'
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#444444', fontSize: 16, fontWeight: '500' }}>
                    {item?.displayData?.airlines?.[0]?.airlineName}
                </Text>
                <Text style={{ color: '#444444', fontSize: 18, fontWeight: '500' }}>₹{item?.fare}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ paddingHorizontal: 5, alignItems: 'center' }}>
                    <Text style={{ color: '#888888', fontSize: 20, fontWeight: '500' }}>
                        {moment(item?.displayData?.source?.depTime).format('HH:MM')}
                    </Text>
                    <Text style={{ color: '#444444', fontSize: 16, fontWeight: '500' }}>
                        {item?.displayData?.source?.airport?.airportCode}
                    </Text>
                </View>
                <View style={{ alignItems: 'center', marginHorizontal: 10, flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#444444', fontSize: 10, padding: 1, fontWeight: '500' }}>
                            {item?.displayData?.totalDuration}
                        </Text>
                        <View style={{ backgroundColor: '#444444', padding: 1, width: 70 }} />
                        <Text style={{ color: '#444444', fontSize: 10, padding: 1, fontWeight: '500' }}>
                            {item?.displayData?.stopInfo}
                        </Text>
                    </View>
                    <View>
                        <Ionicons name="airplane-sharp" size={18} style={{ alignSelf: 'center' }} />
                    </View>
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                    <Text style={{ color: '#888888', fontSize: 20, fontWeight: '500' }}>
                        {moment(item?.displayData?.destination?.arrTime).format('HH:MM')}
                    </Text>
                    <Text style={{ color: '#444444', fontSize: 16, fontWeight: '500' }}>
                        {item?.displayData?.destination?.airport?.airportCode}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const _separator = ({ item, index }) => <View style={{ marginVertical: 5 }} />;
    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={backgroundStyle}>
                <SearchBar />
                {flightsData?.length > 0 ? (
                    <TouchableOpacity onPress={() => props.navigation.push('Filter', {flightsData: flightsData})} style={{flexDirection:'row-reverse', padding:10}}>
                        <Ionicons 
                        name="filter"
                        size={18}
                        />
                    </TouchableOpacity>
                ) : null
                }
                <FlatList
                    style={{ margin: 10 }}
                    showsVerticalScrollIndicator={false}
                    data={flightsData}
                    renderItem={_renderCard}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={_separator}
                    extraData={refreshList}
                />
            </View>
        </SafeAreaView>
    );
};

export default Home;
