import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ImageSlider} from 'react-native-image-slider-banner';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/Scaling';

const AutoScrollingCard = (props: {
  images?: any[];
  onClickViewMore?: () => void;
  showViewMore: boolean;
}) => {
  const {images, onClickViewMore, showViewMore} = props;

  return (
    <View style={styles.card}>
      {images && images.length > 0 ? (
        <View style={styles.sliderContainer}>
          <ImageSlider
            data={images}
            autoPlay
            caroselImageStyle={styles.carouselImg}
            caroselImageContainerStyle={{height: scaleHeight(250)}}
          />
          {showViewMore && (
            <TouchableOpacity
              style={styles.viewMoreBtn}
              onPress={onClickViewMore}>
              <Text style={styles.viewMoreText}>View More</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.imageBox}>
          <Text style={styles.noImageText}>No Image Available</Text>
          <Text style={styles.addImageText}>Add Image to show here</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(10),
    backgroundColor: '#37BD69',
    overflow: 'hidden',
    borderRadius: moderateScale(10),
  },
  sliderContainer: {
    position: 'relative',
  },
  imageBox: {
    width: '100%',
    height: scaleHeight(250),
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: moderateScale(15),
  },
  viewMoreBtn: {
    position: 'absolute',
    top: scaleHeight(10),
    right: scaleWidth(10),
    backgroundColor: 'blue',
    padding: moderateScale(10),
    zIndex: 1,
  },
  viewMoreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scaleFont(15),
  },
  carouselImg: {
    resizeMode: 'cover',
  },
  noImageText: {
    fontSize: scaleFont(25),
    fontWeight: '500',
    color: 'grey',
  },
  addImageText: {
    fontSize: scaleFont(20),
    fontWeight: '500',
    color: 'black',
    marginTop: scaleHeight(20),
  },
});

export default AutoScrollingCard;
