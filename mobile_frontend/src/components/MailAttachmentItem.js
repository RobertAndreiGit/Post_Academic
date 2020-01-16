import React,{Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MailAttachmentItem extends Component
{
  constructor(props)
  {
    super(props);

    this.MenuBar=this.MenuBar.bind(this);
    this.removeAttachment = this.removeAttachment.bind(this);
    this.downloadFile=this.downloadFile.bind(this);
  }

  componentDidMount()
  {
    
  }

  render()
  {    
    return (
        <View style={styles.itemContainer}>
            <View style={styles.item}>
                <this.MenuBar/>

                <TouchableOpacity style={styles.touchable} onPress={()=>this.downloadFile()}>
                    <View style={styles.extensionContainer}>
                        <Text>{this.props.extension}</Text>
                    </View>

                    <View style={styles.fileNameContainer}>
                        <Text numberOfLines={1}>{this.props.fileName}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
  }

  MenuBar()
  {
      if(this.props.uri!==undefined && this.props.removeAttachment!==undefined)
      {
        return(
            <View style={styles.menuBar}>
                <Icon.Button name='ios-close' 
                                style={styles.closeButton} 
                                color={"red"} 
                                size={15} 
                                backgroundColor="transparent" 
                                iconStyle={styles.closeIcon}
                                onPress={()=>this.removeAttachment(this.props.uri)}/>
            </View>
        );
      }
      else
      {
          return null;
      }
  }

  downloadFile()
  {
      if(this.props.downloadFile!==undefined && this.props.fileId!==undefined)
      {
          this.props.downloadFile(this.props.mailId,this.props.fileId,this.props.mailType);
      }
  }

  removeAttachment(uri)
  {
      this.props.removeAttachment(uri);
  }
}

const styles = StyleSheet.create({
    itemContainer:{
        height: 100,
        width: 100,
        borderWidth: 1,
        borderColor:"black",
        borderStyle: "solid",
        marginRight: 10,
        marginTop: 10
    },
    item: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%"
    },
    menuBar: {
        flex: 2,
        opacity: 0.5,
        backgroundColor: "grey",
        width: "100%",
        alignItems: "flex-end"
    },
    extensionContainer: {
        flex: 3,
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    fileNameContainer: {
        flex: 1,
        backgroundColor: "grey",
        width: "100%",
        padding: 3,
        textAlign: "left",
        justifyContent: "center",
    },
    closeIcon:{
        marginLeft: 5,
        marginRight: 0,
    },
    closeButton:{
        width: 30
    },
    touchable:{
        flex: 4
    }
});