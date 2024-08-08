import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/Scaling';

interface CardProps {
  plantName?: string;
  scientificName?: string;
  imageUrl: string;
  description?: string;
  family?: string;
  genus?: string;
  reference?: string;
  tags?: string[];
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  plantNameStyle?: TextStyle;
  scientificNameStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  tagStyle?: TextStyle;
}

const Card: React.FC<CardProps> = ({
  scientificName,
  imageUrl = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg',
  containerStyle,
  imageStyle,
  plantNameStyle,
  descriptionStyle,
  family,
  genus,
  reference,
}) => {
  const handlePress = () => {
    if (reference) {
      Linking.openURL(reference); // This will open the reference URL
    }
  };
  return (
    <View>
      <TouchableOpacity style={[styles.card, containerStyle]}>
        <View style={styles.cardView}>
          <Image source={{uri: imageUrl}} style={[styles.image, imageStyle]} />
          <View style={styles.textContainer}>
            <Text style={[styles.plantName, plantNameStyle]}>
              {scientificName}
            </Text>
            {/* <Text style={[styles.scientificName, scientificNameStyle]}>
              {scientificName}
            </Text> */}
          </View>
        </View>
        <View style={styles.arrow_container}>
          <Icon
            name="chevron-right"
            size={36}
            color="#333"
            style={styles.arrowIcon}
          />
        </View>
        <View style={styles.descriptionView}>
          <Text style={[styles.descriptionTxt, descriptionStyle]}>Family:</Text>
          <Text style={[styles.descriptionText, descriptionStyle]}>
            {family}
          </Text>
        </View>
        <View style={styles.genusView}>
          <Text style={[styles.descriptionTxt, descriptionStyle]}>Genus:</Text>
          <Text style={[styles.descriptionText, descriptionStyle]}>
            {genus}
          </Text>
        </View>
        {reference && (
          <View style={styles.reference_container}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Go to Reference</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tags Section */}
        {/* {tags.length > 0 && (
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>Tags:</Text>
          <View style={styles.tags}>
            {tags.map((tag, index) => (
              <Text key={index} style={[styles.tag, tagStyle]}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
      )} */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    padding: 16,
    marginVertical: scaleHeight(8),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: scaleWidth(10),
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: scaleWidth(90),
    height: scaleHeight(90),
    borderRadius: moderateScale(6),
    marginRight: scaleWidth(25),
  },
  textContainer: {
    flex: 1,
  },
  plantName: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginBottom: scaleHeight(2),
  },
  scientificName: {
    fontSize: scaleFont(18),
    color: '#666',
  },
  descriptionView: {
    marginTop: scaleHeight(-20),
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  genusView: {
    marginTop: scaleHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  descriptionTxt: {
    fontWeight: 'bold',
    fontSize: scaleFont(14),
    marginRight: scaleWidth(5),
  },
  descriptionText: {
    fontSize: scaleFont(14),
    color: '#666',
  },
  referenceText: {
    marginTop: 10,
    fontSize: scaleFont(14),
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: scaleHeight(5),
    paddingHorizontal: scaleWidth(15),
    marginTop: scaleHeight(10),
    // backgroundColor: '#007BFF', // Blue color
    // borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: moderateScale(5),
  },
  buttonText: {
    color: '#007BFF',
    fontSize: scaleFont(14),
  },
  tagsContainer: {
    marginTop: scaleHeight(8),
  },
  tagsTitle: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    marginBottom: scaleHeight(4),
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(12),
    paddingVertical: scaleHeight(4),
    paddingHorizontal: scaleWidth(8),
    marginRight: scaleWidth(8),
    marginBottom: scaleHeight(5),
    fontSize: scaleFont(12),
  },
  arrowIcon: {
    marginLeft: scaleWidth(15),
  },
  arrow_container: {
    alignItems: 'flex-end',
  },
  reference_container: {
    flexDirection: 'row',
  },
});

export default Card;
