import React from 'react';

import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Animated,
    Image
} from 'react-native';
import { images, theme } from '../../constants';
const { photo1, photo2, photo3 } = images;

const { COLORS, FONTS, SIZES } = theme;

const onBoardings = [
    {
        title: "Let's Travelling",
        description: "Lorem",
        img: photo1
    },
    {
        title: "Let's Travelling",
        description: "Lorem",
        img: photo2
    },
    {
        title: "Let's Travelling",
        description: "Lorem",
        img: photo3
    },
]

const OnBoarding = () => {

    const scrollX = new Animated.Value(0);

    function renderContent(){
        return(
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scroolEnabled
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}},
                    ], {useNativeDriver: false}
                  )}
            >
            {onBoardings.map((item, index)=>(
                <View
                key={index}
                style={{ width: SIZES.width}}
                >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        source={item.img}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: "100%"
                        }}/>
                </View>

                <View 
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: 40,
                    right: 40
                }}>
                    <Text style={{...FONTS.h1, color: COLORS.gray, textAlign: 'center'}}>{item.title}</Text>
                    <Text style={{...FONTS.body3, color: COLORS.gray, textAlign: 'center', marginTop: SIZES.base}}>{item.description}</Text>
                </View>

                </View>
            ))}
        </Animated.ScrollView>
        )
        
    }

    function renderDots(){
        const dotPosition = Animated.divide(scrollX, SIZES.width)
        return(
            <View style={styles.dotContainer}>
                {onBoardings.map((item, index)=>{
                    const opacity = dotPosition.interpolate({
                        inputRange: [index-1, index, index+1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    })

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index-1, index, index+1],
                        outputRange: [SIZES.base, 17, SIZES.base],
                        extrapolate: "clamp"
                    })



                    return(
                        <Animated.View
                        key={`dot-${index}`} 
                        opacity={opacity}
                        style={[styles.dot, {width: dotSize, height: dotSize}]}
                        >

                        </Animated.View>
                    )
                })}
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>
            <View style={styles.dotsRootContainer}>
                {renderDots()}
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    dotsRootContainer: {
        position: 'absolute',
        bottom: SIZES.height > 700 ? '25%' : '20%'
    },
    dotContainer: {
        flexDirection: 'row',
        height: SIZES.padding,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.blue,
        marginHorizontal: SIZES.radius/2
    }
})

export default OnBoarding;