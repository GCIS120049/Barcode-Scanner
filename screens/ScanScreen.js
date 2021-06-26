import React from 'react';
import { Text, View , TouchableOpacity, StyleSheet , Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scanData:'',
      buttonState:'normal'
    }
}   

getCameraPermissions=async()=>{
    const {status}= await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions:status==="granted",
      scanned:false, 
      buttonState:'clicked'
    });
}

handleBarcodeScanned=async({type,data})=>{
    this.setState({
      scanned:true,
      scanData:data,
      buttonState:'normal'
    });
}

render(){
    const hasCameraPermissions=this.state.hasCameraPermissions;
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState;
    if(buttonState==='clicked' && hasCameraPermissions){
        return(
          <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}/>
        )
    }
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
            style={{width: 100,height: 100}}
            source={require('../assets/barcode.jpg')} />
            <Text style={{
              fontSize:30,
              fontWeight:'bold',
              color:'maroon'
            }}> BARCODE SCANNER </Text>
            <Text style={styles.displayText}>
          {hasCameraPermissions===true?this.state.scanData:"REQUEST CAMERA PERMISSIONS"}</Text>
          <TouchableOpacity style={styles.scanButton}
          onPress={this.getCameraPermissions}>
            <Text style={styles.buttonText}>SCAN QR CODE</Text>
          </TouchableOpacity>
        </View>
    )
}
}
const styles = StyleSheet.create({
   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    displayText:{ fontSize: 15, textDecorationLine: 'underline' }, 
    scanButton:{ backgroundColor: 'pink', padding: 10, margin: 10 },
     buttonText:{ fontSize: 20, } 
});