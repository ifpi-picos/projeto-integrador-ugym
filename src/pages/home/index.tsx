import React, {useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions, 
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

import Header from '@/components/header';
import { temas } from '@/global/temas';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.6; // Largura do item principal
const ITEM_SPACING = (width - ITEM_WIDTH) / 20; // Espaçamento entre os ite
import headerImage from '../../assets/images/header.jpg';
import notification from '../../assets/images/Notification.png';
import banner from '../../assets/images/BG.png';
import fire from '../../assets/images/fire.png';
import model from '../../assets/images/model.png';
import couple from '../../assets/images/couple.jpg';
import cycle from '../../assets/images/cycle.png';
import yoga from '../../assets/images/yoga.png';
import walk from '../../assets/images/walk.png';
import next from '../../assets/images/next.png';
import play from '../../assets/images/play.png';
import star from '../../assets/images/Star.png';
import book from '../../assets/images/Book.png';
import home from '../../assets/images/Home.png';
import heart from '../../assets/images/H.png';
import calendar from '../../assets/images/Calender.png';
import profile from '../../assets/images/User.png';
import plus from '../../assets/images/Plus.png';
import { useNavigation, NavigationProp } from "@react-navigation/native";

const Home = () => {
    const navigation = useNavigation<NavigationProp<any>>();
  
  const handleAdcCard = () => {
    console.log('Adicionando Card');
    navigation.navigate('AddActivity'); }  

  return (
    <>
    <ScrollView>

      <SafeAreaView style={appStyles.container}>
        <View style={appStyles.screen}>
        <Header nome="Rodrigo Gonçalves" imagem="https://via.placeholder.com/150" />
        <Banner />
        </View>
        <View style={{marginHorizontal: '3%'}}>
          <Text style={styles.label}>Suas Atividades</Text>
          {/* Substituímos a View com Cards pela FlatList personalizada */}
          <View style={{height: 250, marginVertical: 10}}>
            <HighlightedFlatList />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text style={styles.label}>Vídeos Fitness</Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                opacity: 0.5,
                fontSize: 12,
                color: temas.cores.textoSecundario,
              }}>
              Ver Todos
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <VideoPlay />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
      {/* <BottomTab /> */}
    </>
  );
};

const appStyles = StyleSheet.create({
  container: {
    // marginTop: 35,
    flex: 1,
    backgroundColor: temas.cores.bgScreen,
    minHeight: '100%',
  },
  screen: {
    marginBottom: 10,
  },
  label: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginVertical: 10,
    color: temas.cores.textoPrimario,
  },
});

export default Home;

const BottomTab = () => (
  <View
    style={{
      position: 'absolute',
      bottom: 10,
      margin: 10,
      marginHorizontal: 25,
      borderRadius: 20,
      padding: 10,
      backgroundColor: temas.cores.bgCard,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <BottomButton image={home} style={undefined} imageStyle={undefined} />
    <BottomButton image={heart} style={undefined} imageStyle={undefined} />
    <BottomButton
      image={plus}
      style={{
        position: 'absolute',
        left: '43%',
        top: -25,
        backgroundColor: temas.cores.textoBranco,
        padding: 8,
        borderRadius: 20,
      }} imageStyle={undefined}    />
    <BottomButton image={undefined} style={undefined} imageStyle={undefined} />
    <BottomButton image={calendar} style={undefined} imageStyle={undefined} />
    <BottomButton image={profile} style={undefined} imageStyle={undefined} />
  </View>
);
const BottomButton = ({image, style, imageStyle}: {image: any, style: any, imageStyle: any}) => (
  <>
    <View
      style={[
        {
          flex: 1,
          alignSelf: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <Image
        source={image}
        style={[
          {
            height: image === plus ? 40 : 20,
            width: image === plus ? 40 : 20,
          },
          imageStyle,
        ]}
      />
    </View>
    {image === home && (
      <View
        style={{
          width: '10%',
          position: 'absolute',
          height: 2,
          backgroundColor: temas.cores.primaria,
          bottom: 0,
          left: 25,
        }}
      />
    )}
  </>
);

const VideoPlay = () => (
  <FlatList
    data={data}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item, index }) => (
      <View
        style={{
          borderRadius: 15,
          marginHorizontal: 12,
          shadowOffset: { width: -5, height: 3 },
          shadowColor: 'grey',
          shadowOpacity: 0.5,
          shadowRadius: 3,
          backgroundColor: temas.cores.bgCard,
        }}>
        <View style={{ borderRadius: 10, overflow: 'hidden' }}>
          <ImageBackground
            source={couple}
            style={{
              height: 150,
              width: 300,
            }}>
            <LinearGradient
              locations={[0, 1.0]}
              colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.60)']}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}></LinearGradient>
          </ImageBackground>
          <Text
            style={{
              position: 'absolute',
              bottom: 5,
              left: 10,
              fontFamily: 'Poppins-Regular',
              color: temas.cores.textoPrimario,
            }}>
            Transformação
          </Text>
          <View
            style={{
              position: 'absolute',
              backgroundColor: temas.cores.textoBranco,
              padding: 5,
              right: 10,
              top: 10,
              borderRadius: 5,
            }}>
            <Image source={star} style={{ height: 10, width: 10 }} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: temas.cores.bgCard,
            padding: 10,
            borderRadius: 15,
          }}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: temas.cores.primaria,
              padding: 10,
              right: 25,
              top: -15,
              borderRadius: 15,
              zIndex: 3,
            }}>
            <Image source={play} style={{ height: 10, width: 10 }} />
          </View>
          <Text style={{ fontFamily: 'Poppins-Regular', color: temas.cores.textoPrimario }}>
            Treino de Bulking- 2 Horas
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: temas.cores.textoSecundario }}>
              <Image source={book} style={{ height: 15, width: 15 }} />
              {'   Iniciante'}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                color: temas.cores.primaria,
              }}>
              45 Min
            </Text>
          </View>
        </View>
      </View>
    )}
    horizontal
  />
);

interface CardData {
  name: string;
  status: number;
  image: any;
  lightColor: string;
  color: string;
  darkColor: string;
}

const Card = ({ data, scale }: { data: any; scale: Animated.AnimatedInterpolation<number> }) => {
  const isAddCard = data.name === 'Adicionar'; // Verifica se o card é de adição
  const navigation = useNavigation<NavigationProp<any>>(); // Hook para navegação

  const handleAdcCard = () => {
    console.log('Adicionando Card');
    navigation.navigate('AddActivity');
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        height: 180,
        width: ITEM_WIDTH,
        padding: 10,
        alignSelf: 'center',
        backgroundColor: isAddCard ? '#D3D3D3' : data.color, // Se for o card de adição, usa a cor cinza
        justifyContent: 'center', // Centra o conteúdo no card
        marginHorizontal: 2,
        borderRadius: 10,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}
    >
      {isAddCard ? (
        // Adiciona a funcionalidade de toque no card de adição
        <TouchableWithoutFeedback onPress={handleAdcCard}>
          <View>
            <Image source={plus} style={{ height: 40, width: 40, alignSelf: 'center' }} />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <>
          <Image source={data.image} style={{ height: 25, width: 25 }} />
          <View style={{ alignSelf: 'center', margin: 5 }}>
            <Progress.Circle
              size={50}
              progress={data.status / 100}
              showsText
              unfilledColor="#ededed"
              borderColor="#ededed"
              color={temas.cores.primaria}
              direction="counter-clockwise"
              fill="white"
              strokeCap="round"
              thickness={5}
              textStyle={{
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
                fontWeight: 'bold',
                color: temas.cores.primaria,
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 10, fontFamily: 'Poppins-Light', color: temas.cores.quasePreto }}>{'Dia     1'}</Text>
            <Text style={{ fontSize: 10, fontFamily: 'Poppins-Light', color: temas.cores.quasePreto }}>{'Tempo   20 min'}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: 'Poppins-Regular', color: temas.cores.quasePreto }}>{data.name}</Text>
            <View
              style={{
                backgroundColor: data.lightColor,
                padding: 2,
                borderRadius: 10,
              }}
            >
              <Image
                source={next}
                style={{
                  height: 12,
                  width: 12,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
        </>
      )}
    </Animated.View>
  );
};



const HighlightedFlatList = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  // Dados adicionais para o card de adicionar
  const extendedData = [...data, {name: 'Adicionar', status: 0, image: plus, lightColor: '#D3D3D3', color: '#E0E0E0', darkColor: '#A9A9A9'}];

  return (
    <View style={{flex: 1, backgroundColor: temas.cores.bgScreen, justifyContent: 'center'}}>
      <Animated.FlatList
        data={extendedData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: ITEM_SPACING}}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true}
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          return (
            // Se for o card de adicionar, aplicar um estilo especial
            <Card data={item} scale={scale} />
          );
        }}
      />
    </View>
  );
};

// const Header = () => (
//   <View style={styles.header}>
//     <ImageContainer image={headerImage} />
//     <HeaderTitle />
//     <ImageContainer image={notification} height={20} width={20} />
//   </View>
// );
const Banner = () => (
  <>
    <View style={styles.bannertotal}>

    <ImageBackground style={styles.banner} source={banner}>
      <View style={styles.bannerContainer}>
        <View style={styles.rowLabel}>
          <View style={styles.fireContainer}>
            <Image
              source={fire}
              resizeMode="contain"
              style={styles.fireImage}
            />
          </View>
          <Text style={styles.offer}>oferta limitada</Text>
        </View>
        <OfferText>30% de Desconto</OfferText>
        <OfferText>Vendas Relâmpago</OfferText>
      </View>
    </ImageBackground>
    </View>
    <Image source={model} style={styles.model} resizeMode="contain" />

  </>
);

const OfferText = ({children}: {children: React.ReactNode}) => (
  <Text style={styles.offerText}>{children}</Text>
);
 
// const ImageContainer = ({image, height = 100, width = 100}: {image: any, height?: number, width?: number}) => (
//   <View style={styles.imageContainer}>
//     <Image source={image} style={[{height: height as number, width: width as number}]} />
//   </View>
// );
// const HeaderTitle = () => (
//   <View style={styles.title}>
//     <Text style={styles.bigTitle}>Oi, Jane</Text>
//     <Text style={styles.smallTitle}>12 de Ago, 2021</Text>
//   </View>
// );

const Label = ({children}: {children: React.ReactNode}) => <Text style={styles.label}>{children}</Text>;
const styles = StyleSheet.create({
  container: {flex: 1},
  bannertotal: {flex: 1, width: "90%", justifyContent: 'center', alignItems: 'center', alignSelf: 'center'},
  header: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {paddingHorizontal: 10, flex: 1, justifyContent: 'center'},
  bigTitle: {fontSize: 16, fontFamily: 'Poppins-Medium', color: temas.cores.textoPrimario},
  smallTitle: {fontSize: 10, fontFamily: 'Poppins-Regular', opacity: 0.6, color: temas.cores.textoSecundario},
  image: {height: '100%', width: '100%'},
  fireImage: {height: 40, width: 40, alignSelf: 'center', margin: 1},
  banner: {
    marginTop: 50,
    padding: 30,
    resizeMode: 'contain',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: temas.cores.bgCard,
  },
  bannerContainer: {flex: 1},
  label: {fontFamily: 'Poppins-Medium', fontSize: 20, marginVertical: 10, color: temas.cores.textoPrimario},
  model: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 10,
    height: '50%',
    width: '50%',
    transform: [{rotateY: '180deg'}],
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {margin: '3%'},
  offer: {color: temas.cores.textoPrimario, fontFamily: 'Poppins-Regular', fontSize: 12},
  offerText: {color: temas.cores.textoSecundario, fontSize: 16, fontFamily: 'Poppins-Regular'},

  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fireContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const data = [
  {
    name: 'Ciclismo',
    status: 85,
    image: cycle,
    lightColor: '#f8e4d9',
    color: '#fcf1ea',
    darkColor: '#fac5a4',
  },
  {
    name: 'Caminhada',
    status: 25,
    image: walk,
    lightColor: '#d7f0f7',
    color: '#e8f7fc',
    darkColor: '#aceafc',
  },
  {
    name: 'Yoga',
    status: 85,
    image: yoga,
    lightColor: '#dad5fe',
    color: '#e7e3ff',
    darkColor: '#8860a2',
  },
  
];
