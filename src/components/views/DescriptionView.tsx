import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import QuillEditor, {QuillToolbar} from 'react-native-cn-quill';
import HTMLView from 'react-native-htmlview';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Scaling';

interface DescriptionViewProps {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<any>>;
}

const DescriptionView: React.FC<DescriptionViewProps> = ({
  description,
  setDescription,
}) => {
  const [isEditing, setIsEditing] = useState(true);
  const quillEditorRef = useRef<QuillEditor>(null);

  const handleToggleEditing = async () => {
    if (isEditing) {
      const contentHtml = await quillEditorRef.current?.getHtml();
      console.log('contents', contentHtml);
      if (contentHtml) {
        setDescription(contentHtml);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Text style={styles.heading}>Description</Text>
      {isEditing ? (
        <View style={styles.sub_container}>
          <QuillEditor
            ref={quillEditorRef}
            style={styles.richTextEditor}
            autoSize
            import3rdParties="local"
            quill={{
              placeholder: 'Enter the description here!',
              modules: {
                toolbar: false,
              },
            }}
            initialHtml={description}
            onHtmlChange={content => {
              setDescription(content);
            }}
          />
          <QuillToolbar editor={quillEditorRef} options="full" theme="light" />
        </View>
      ) : (
        <>
          {description.length > 0 && (
            <HTMLView value={description} stylesheet={htmlStyles} />
          )}
        </>
      )}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={handleToggleEditing}>
        <Text style={styles.toggleButtonText}>{isEditing ? '✔️' : '✏️'}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default DescriptionView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(10),
    backgroundColor: '#E8F4F2',
  },
  sub_container: {
    flex: 1,
  },
  heading: {
    fontSize: scaleFont(20),
    fontWeight: '500',
    color: 'black',
    marginBottom: scaleHeight(10),
  },
  richTextEditor: {
    height: scaleHeight(300),
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: scaleWidth(10),
    borderRadius: scaleWidth(5),
  },
  toggleButton: {
    alignSelf: 'center',
    marginTop: scaleHeight(10),
    padding: scaleWidth(5),
    zIndex: 1,
  },
  toggleButtonText: {
    fontSize: scaleFont(20),
    color: 'black',
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: scaleFont(16),
    lineHeight: scaleHeight(24),
  },
});
