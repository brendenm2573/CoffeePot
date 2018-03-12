import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import CountDown from '../components/CountDown';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR } from '../constants/style';

const cup_image = require('../images/coffee_cup_symbol.png');
const cups = [{cup_image},{cup_image},{cup_image},{cup_image},{cup_image}]

///////////////////////////////////////////////////////////////////
// Make Component: CoffeePot has "startTime" & "endTime" properties
//   to define countdown timer; "orderNum" defines number of drinks in
//   CoffeePot; "coffeeShop" holds coffee shop for CoffeePot; "order" 
//   holds information for individual orders
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
//  Method taken from Expo documents
function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
}

class HomeCoffeePot extends Component {
    ///////////////////////////////////////////////////////////
    //// State of current CoffeePot
    state = {
        time: null,
        alreadyStarted: false,
        drinks: null,
        firstScreen: true,
        secondScreen: false,
        thirdScreen: false
    }

    ///////////////////////////////////////////////////////////////////
    //  Method taken from Expo documents
    async _loadAssetsAsync() {
        const imageAssets = cacheImages([
            require('../images/CoffeePot-Logo-White-02.png'),
            require('../images/CoffeeCupTest.png')
        ]);

        await Promise.all([...imageAssets]);
    }

    componentWillMount() {
        // Sets state to start Coffee Pot for 10 minutes
        if (this.props.time === true) {
            this.setState({ alreadyStarted: true })
        }

        this.setState({ drinks: this.props.drinks })
    }

    TimerStatus = () => {
        if (this.props.time)
            return (
                <CountDown />
            );
        
        if (this.state.alreadyStarted)
            return (
                <Text style={{ fontSize: 50, color: 'white' }}>
                    Finished!
                </Text>
            );
        
        return (<View />);
    }
    
    renderCoffeePotTimer = () => {
        return (
            <View style={styles.background}>
                <TouchableOpacity onPress={this.onFirstPress}> 
                    <Image
                        source={require('../images/CoffeePot-Logo-White-02.png')}
                        style={{
                            width: 250,
                            height: 250,
                        }}
                    />
                    <View style={{ alignItems: 'center' }}>
                        {this.TimerStatus()}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderNumberOfDrinks = () => {
        var cups = [] 
        for (var i = 0; i < this.props.drinks; i++ ) {
            cups.push(<Image key={i} source={require('../images/coffee_cup_symbol.png')}
                style={{
                    width: 50,
                    height: 100,
                    margin: 5
                }}
            />)
        }

        return (

            <View style={styles.background}>
                <TouchableOpacity onPress={this.onSecondPress}>
                    <View style={{ 
                            flexDirection:'row', 
                            marginTop: 70, 
                            marginBottom: 40 
                        }}>
                        {cups.map(function(img,i){
                            return img;
                        })}
                    </View>
                    <View style={{ marginBottom: 54, alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'white' }}>
                            Number of Drinks: {this.props.drinks}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderShopInformation = () => {
        return (
            <View style={styles.background}>
                <TouchableOpacity onPress={this.onThirdPress}
                    style={{ marginTop: 10}}
                >
                    <Image
                        source={require('../images/store_icon.png')}
                        style={{
                            width: 250,
                            height: 250,
                        }}
                    />
                    <View style={{ marginBottom: 14, alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'white' }}>
                            Drive: 15 minutes
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    onFirstPress = () => {
        this.setState({ firstScreen: false })
        this.setState({ secondScreen: true })
    }

    onSecondPress = () => {
        this.setState({ secondScreen: false })
        this.setState({ thirdScreen: true })
    }

    onThirdPress = () => {
        this.setState({ thirdScreen: false })
        this.setState({ firstScreen: true })
    }

    renderScreenView = () => {
        if (this.state.secondScreen)
            return ( this.renderNumberOfDrinks() );
        else if (this.state.thirdScreen)
            return ( this.renderShopInformation() );
        
        return ( this.renderCoffeePotTimer() );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderScreenView()}
            </View>
        );
    }
}

/////////////////////////////////////////////////////////
// Map redux reducers to component mapStateToProps
function mapStateToProps({ coffee }) {
    return {
        time: coffee.time,
        drinks: coffee.drinks
    };
}

export default connect(mapStateToProps, actions)(HomeCoffeePot);

const styles = {
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },
    button_style: {
        backgroundColor: BUTTON_COLOR,
        width: 345,
        height: 45,
        borderWidth: 0,
        borderRadius: 5
    },
    container: {
        flexDirection: 'row'
    }
};