import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ViewImage({ route, navigation }) {
  const [viewerVisible, setViewerVisible] = React.useState(false);


  const { image } = route.params;


  const images = [{
    url: image,
  }
  ]


  return (

    <View style={styles.container}>
      <TouchableOpacity onPress={() => setViewerVisible(true)} style={styles.header} activeOpacity={0.5} onPressIn={()=>navigation.goBack()}>
        <Icon name="closecircle" size={25} color="#808080" />
      </TouchableOpacity>


      <ImageViewer style={{ height: '90%', width: '100%', alignSelf: 'center' }} visible={viewerVisible} 
        onCancel={() => setViewerVisible(false)}
        imageUrls={images} enableSwipeDown={true} onSwipeDown={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#000'
  },
  closeButton: {
    paddingHorizontal: 10,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 15,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 20,
  },
});